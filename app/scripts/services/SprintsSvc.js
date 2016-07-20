(function() {
    console.log("SprintsSvc.js");

    var sprintsSvc = function($http) {


        var listSprints = function() {
            var sprints = [
                {num: 1, name: 'Sprint 1'}, 
                {num: 2, name: 'Sprint 2'}, 
                {num: 3, name: 'Sprint 3'}, 
                {num: 4, name: 'Sprint 4'}, 
                {num: 5, name: 'Sprint 5'}];
            return sprints;
        };

        var listSprintTests = function(num) {
            switch(num) {
                case 1:
                    var tests = [
                        {name: 'test1', url: '/Patient/[id]'}
                    ];
                    break;
            }
            return tests;
        };

        // var expand = function(id) {
        //     console.log("terminologyService.expand(" + id + ")");
        //     return $http.get("http://localhost:8080/flex-server/fhir/ValueSet/" + id + "/$expand")
        //         .then(function(response) {
        //             return response.data;
        //         });
        // };

        return {
            listSprints:listSprints,
            listSprintTests:listSprintTests
        };
    };    

    var app = angular.module('smartApp');
    app.factory('SprintsSvc',sprintsSvc);

}());

