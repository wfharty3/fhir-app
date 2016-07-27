var app = angular.module('fhirMan');
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

 	SprintsSvc.listSprints().then(function(data) {
	 	$scope.sprintList = data;
	 	$scope.$apply();
 	})


 	$scope.SprintChanged = function() {
	 	SprintsSvc.listSprintOps($scope.selectedSprint).then(function(data) {
		 	$scope.opList = data;
		 	$scope.$apply();
	 	});
 	};

 	$scope.OpChanged = function() {
 		$scope.transformedOp = SprintsSvc.transformOp($scope.selectedOp, $scope.patient);
 		$scope.$apply();
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