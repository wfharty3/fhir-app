var app = angular.module('smartApp');
app.controller('SprintsCtrl',function($scope,SprintsSvc,SMARTObject) {
  
 	$scope.tab = "Sprints";

	SMARTObject.then( function (smart){
		console.log('Patient ID: ' + smart.patient.id);
		$scope.server = {
			'host': smart.server.serviceUrl,
			'token': smart.server.auth.token
		};
		smart.patient.read().then(function(pt){
			console.log('in the smart object here');
			$scope.patient = {
				'id': pt.id,
				'system': pt.identifier[0].system,
				'value': pt.identifier[0].value,
			 	'mrn': pt.identifier[0].value,
			 	'lastName': pt.name[0].family[0],
			 	'firstName': pt.name[0].given[0],
			 	'fullName': pt.name[0].family[0] + ', ' + pt.name[0].given[0],
			 	'narrative': pt.text.div,
			 	'gender': pt.gender,
			 	'birthdate': pt.birthDate			
			};
			$scope.$apply();
	  });
	});

 	var sprintList = SprintsSvc.listSprints();
 	$scope.sprintList = sprintList;

 	var opList = SprintsSvc.listSprintOps(1);
 	$scope.opList = opList;


 	$scope.SprintChanged = function() {
	 	var opList = SprintsSvc.listSprintOps($scope.selectedSprint);
 		$scope.opList = opList;
 		console.log('about to apply');
 	};

 	$scope.OpChanged = function() {
 		$scope.transformedOp = SprintsSvc.transformOp($scope.selectedOp, $scope.patient);
 	};

    var onComplete = function(data) {
    	$scope.opResults = data;
    };

    var onError = function(reason) {
    	$scope.error = 'Error: ' + reason;
    };

 	$scope.ExecuteOp = function() {
 		SprintsSvc.executeOp($scope.transformedOp, $scope.server).then(onComplete, onError);
 	}


});