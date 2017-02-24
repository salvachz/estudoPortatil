app.controller('LeftMenuCtrl', function($scope, $location) {

    $scope.go = function(path){
         $location.path(path);
    }

    $scope.items =[
    {
        'name': 'home',
        'icon': 'home.png',
        'path': 'dashboard'
    },
    {
        'name': 'escrever',
        'icon': 'write.png',
        'path': 'enviar-redacao'
    },
    {
        'name': 'correct',
        'icon': 'correct.png',
        'path': 'corrigir-redacao'
    }];


});
