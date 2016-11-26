'use strict';
 
var app = angular.module('app', ['ngRoute']);
 
// Declared route 
app.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {

    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(true);

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';


    $routeProvider.when('/login', {
        templateUrl: '/static/templates/login.html',
        controller: 'LoginCtrl'
    })
  .otherwise({redirectTo : '/login'});

}])
.constant('CONFIG', {
    'WS_URL' : 'http://localhost:8000/ws'
    }
);
