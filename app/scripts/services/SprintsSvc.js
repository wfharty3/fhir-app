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

        var listSprintOps = function(num) {
            switch(num) {
                case '1':
                    var ops = [
                        {url: '/Patient/[id]'},
                        {url: '/Patient?identifier=[system]|[value]'},
                        {url: '/Patient?name=[lastName]&gender=[gender]'},
                        {url: '/Patient?name=[lastName]&birthdate=[birthdate]'},
                        {url: '/Patient?family=[lastName]&gender=[gender]'},
                        {url: '/Patient?given=[firstName]&gender=[gender]'}
                    ];
                    break;
            }
            return ops;
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

    var app = angular.module('smartApp');
    app.factory('SprintsSvc',sprintsSvc);

}());

