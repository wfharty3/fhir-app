var app = angular.module('smartApp');
app.controller('SprintsCtrl',function($scope,SprintsSvc) {
  
 	$scope.tab = "Sprints";

 	var sprintList = SprintsSvc.listSprints();
 	$scope.sprintList = sprintList;
 	console.log(sprintList);

});