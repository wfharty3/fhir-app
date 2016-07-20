var app = angular.module('smartApp');

//app.controller('MainCtrl',function($scope,$routeParams,SMARTObject) {
app.controller('PatientCtrl',function($scope,$routeParams, $http, SMARTObject) {
  

 //  FHIR.oauth2.ready($routeParams, function(smart){
 //  	console.log('FHIR oauth2 ready function');
	// smart.patient.read().then(function(pt) {
	//  console.log('read patient: ' + pt.id);
	//  $scope.patient = {
	//  	'mrn': pt.id,
	//  	'fullName': pt.name[0].family[0] + ', ' + pt.name[0].given[0],
	//  	'narrative': pt.text.div,
	//  	'gender': pt.gender,
	//  	'birthdate': pt.birthDate
	//  	//'address': pt.address[0].line[0] + ', ' + pt.address[0].city[0] + pt.address[0].state[0]
	//  }
	//  $scope.$apply();
	// });
 //   });  

 	$scope.tab = "Patient";

 	
	SMARTObject.then( function (smart){
		console.log('Patient ID: ' + smart.patient.id);
		smart.patient.read().then(function(pt){
			console.log('in the smart object here');
			$scope.patient = {
				'id': pt.id,
			 	'mrn': pt.id,
			 	'fullName': pt.name[0].family[0] + ', ' + pt.name[0].given[0],
			 	'narrative': pt.text.div,
			 	'gender': pt.gender,
			 	'birthdate': pt.birthDate			
			};
			$scope.$apply();
	  });
	});

	SMARTObject.then(function(smart) {
        $http.get("https://httpbin.org/get").then(function(response) {
                console.log('Response data');
                console.log(response.data);
            });		
	});

});