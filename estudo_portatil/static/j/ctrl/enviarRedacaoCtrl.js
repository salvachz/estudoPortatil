app.controller('EnviarRedacaoCtrl', function(WordingService, CategoryService, $scope, $location) {

    console.log('no EnviarRedacaoCtrl');

    $scope.data = {};
    $scope.categorys = [];
/*{
        'id':1,
        'name': 'Sustentabilidade'
    },
    {
        'id':2, 
        'name': 'Mobilidade Urbana'
    }
    */
    CategoryService.getCategoryList().then(function(data){
        $scope.categorys = data;
    });

    $scope.go = function(path){
         $location.path(path);
    }

    $scope.enviar = function(){
        WordingService.sendWording($scope.data).then(
            function(response){
                alert('aqui deveria ter uma tela de sucesso! pq deu boa o/');
            },
            function(error){
            }
        );
    }

});
