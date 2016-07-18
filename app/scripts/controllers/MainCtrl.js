var app = angular.module('smartApp');

app.controller('MainCtrl',function($scope,$routeParams,SMARTObject) {
  

  FHIR.oauth2.ready($routeParams, function(smart){
  	console.log('FHIR oauth2 ready function');
	smart.patient.read().then(function(pt) {
	 console.log('read patient: ' + pt.id);
	 $scope.patient = {
	 	'mrn': pt.id,
	 	'fullName': pt.name[0].family[0] + ', ' + pt.name[0].given[0],
	 	'narrative': pt.text.div,
	 	'gender': pt.gender,
	 	'birthdate': pt.birthDate
	 	//'address': pt.address[0].line[0] + ', ' + pt.address[0].city[0] + pt.address[0].state[0]
	 }
	 $scope.$apply();
	});
   });  


	// SMARTObject.then( function (smart){
	// 	console.log('in the THEN function');
	// 	console.log('Patient ID: ' + smart.patient.id);
	// 	//pid = $window.ptId;
	// 	smart.patient.read().then(function(pt){
	// 		console.log('in the smart read.then function');
	// 		$scope.mrn = pt.id;
	// 		console.log('end read.then: patient id is ' + pt.id);
	// 	});
	// });

	//$scope.patient.mrn = "test";
  
});