'use strict';
// TODO: put iffe around this e.g. (function() {})

var app = angular.module('smartApp',['ngRoute','ngResource', 'ngSanitize']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/after-auth', {
        templateUrl: 'app/views/patient.html',
        controller: 'MainCtrl'
    })
    .when('/patient', {
        templateUrl: 'app/views/patient.html',
        controller: 'PatientCtrl'
    })
    .when('/sprints', {
        templateUrl: 'app/views/sprints.html',
        controller: 'SprintsCtrl'
    })
    .when('/meds', {
        templateUrl: 'views/meds.html',
        controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/patient'
    });
});

app.factory('SMARTObject', function GetSmart($http, $q) {
  var defer = $q.defer();
  if(!window.smart){
    FHIR.oauth2.ready(function(smart){
      window.smart = smart;
      defer.resolve(smart);
      console.log(" smart factory: attached smart object to window object "+ window.smart);
    });
  }else{
    defer.resolve(window.smart);
  }
  return defer.promise;
});
