'use strict';
 
var app = angular.module('app', ['angular-loading-bar', 'ngAnimate', 'ngRoute', 'ngCookies', 'textAngular']);
var HOST = ''
 
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
    $routeProvider.when('/corrigir-redacao/:id/:slug', {
        templateUrl: '/static/templates/corrigir-redacao.html',
        controller: 'CorrigirRedacaoCtrl'
    })
    $routeProvider.when('/corrigir-redacao', {
        templateUrl: '/static/templates/corrigir-redacao.html',
        controller: 'CorrigirRedacaoCtrl'
    })
    $routeProvider.when('/enviar-redacao', {
        templateUrl: '/static/templates/enviar-redacao.html',
        controller: 'EnviarRedacaoCtrl'
    })
    $routeProvider.when('/minha-avaliacao/:id/:slug', {
        templateUrl: '/static/templates/minha-avaliacao.html',
        controller: 'MinhaAvaliacaoCtrl'
    })
  .otherwise({redirectTo : '/login'});

  //for 403 forbidden errors
  $httpProvider.interceptors.push('LoggedObserver');

}])
.constant('CONFIG', {
    'HOST' : HOST,
    'WS_URL' : HOST+'/lyra/ws',
    "TOPIC_INFO": {
        '1': "Domínio da norma padrão da língua.",
        '2': "Compreensão da proposta.",
        '3': "Seleção e organização das informações.",
        '4': "Demonstração de conhecimento da língua necessario para argumentação do texto.",
        '5': "Elaboração de uma proposta de solução para os problemas abordados, respeitando os valores e considerando as diversidades socioculturais.",
        '6': "Comentários adicionais (opcional)",
    }
})
.run(function($window, UserService){
    $window.fbAsyncInit = function() {
        FB.init({ 
          appId: '1861177677431577',
          status: true, 
          cookie: true, 
          xfbml: true,
          version: 'v2.4'
        });
    };

    //FB.Event.subscribe('auth.authResponseChange', UserService.fbAuthChange);
});
