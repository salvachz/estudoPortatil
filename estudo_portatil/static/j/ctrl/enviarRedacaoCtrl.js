app.controller('EnviarRedacaoCtrl', function(WordingService, CategoryService, $scope, $location, textAngularManager) {

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
            var n_data = {};
            n_data.category = $scope.data.category;
            n_data.title = $scope.data.title;
            n_data.text = btoa($scope.data.text);
        WordingService.sendWording(n_data).then(
            function(response){
                alert('aqui deveria ter uma tela de sucesso! pq deu boa o/');
            },
            function(error){
            }
        );
    }

});
