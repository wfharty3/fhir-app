(function() {
    console.log("SprintsSvc.js");

    var sprintsSvc = function($http) {

        var listSprints = function() {
            return $http.get('app/data/sprints.json').then(function success(response){
                var sprints = [];
                for (i=0; i < response.data.sprints.length; i++) {    
                    var s = {"num": response.data.sprints[i].num, "name": response.data.sprints[i].name};
                    sprints.push(s);
                };
                return sprints;
            });
        };

        var listSprintOps = function(num) {
            return $http.get('app/data/sprints.json').then(function success(response){
                return response.data.sprints[num-1].operations;
            });
        };

        var transformOp = function(op,pt) {
            var retValue = op.replace('[id]',pt.id);
            retValue = retValue.replace('[gender]',pt.gender);
            retValue = retValue.replace('[system]',pt.system);
            retValue = retValue.replace('[value]',pt.value);
            retValue = retValue.replace('[lastName]',pt.lastName);
            retValue = retValue.replace('[firstName]',pt.firstName);
            return retValue;
        }

        var executeOp = function(url, server) {
            console.log('executing URL: ' + url);
            var req = {
                method: 'GET',
                url: server.host + url,
                headers: {
                   'Authorization': 'Bearer ' + server.token
                }                
            };
            return $http(req).then(function success(response) {
                return response.data;
            });
        };

        return {
            listSprints:listSprints,
            listSprintOps:listSprintOps,
            transformOp: transformOp,
            executeOp: executeOp
        };
    };    

    var app = angular.module('fhirMan');
    app.factory('SprintsSvc',sprintsSvc);

}());

