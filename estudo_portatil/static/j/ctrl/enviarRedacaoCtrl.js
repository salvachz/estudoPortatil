app.controller('EnviarRedacaoCtrl', function(WordingService, $scope, $location) {

    console.log('no EnviarRedacaoCtrl');

    $scope.data = {};
    $scope.categorys = [{
        'id':1,
        'name': 'Sustentabilidade'
    },
    {
        'id':2, 
        'name': 'Mobilidade Urbana'
    }
    ]

    $scope.go = function(path){
         $location.path(path);
    }

    $scope.enviar = function(){
        WordingService.sendWording($scope.data).then(
            function(response){
            },
            function(error){
            }
        );
    }

});
