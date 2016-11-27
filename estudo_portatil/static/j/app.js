'use strict';
 
var app = angular.module('app', ['ngRoute', 'ngCookies']);
 
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
    $routeProvider.when('/dashboard', {
        templateUrl: '/static/templates/dashboard.html',
        controller: 'DashboardCtrl'
    })
    $routeProvider.when('/propostas-redacao', {
        templateUrl: '/static/templates/propostas-redacao.html',
        controller: 'PropostasRedacaoCtrl'
    })
    $routeProvider.when('/corrigir-redacao', {
        templateUrl: '/static/templates/corrigirRedacao.html',
        controller: 'CorrigirRedacaoCtrl'
    })
    $routeProvider.when('/enviar-redacao', {
        templateUrl: '/static/templates/enviarRedacao.html',
        controller: 'EnviarRedacaoCtrl'
    })
  .otherwise({redirectTo : '/login'});

}])
.constant('CONFIG', {
    'WS_URL' : 'http://localhost:8000/ws'
    }
);
