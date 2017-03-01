app.controller('EnviarRedacaoCtrl', function(WordingService, CategoryService, $scope, $location, textAngularManager, $interval, $timeout) {

    console.log('no EnviarRedacaoCtrl');
    $scope.drawingState = false;
    $scope.hasToPreSaveDrawing = false;
    $scope.showHolder = false;
    $scope.errors = [];
    $scope.success = false;

    var preSaveDrawing = window.localStorage.getItem('preSaveDrawing');

    $scope.data = {
        categoria:'',
        titulo:'',
        texto:preSaveDrawing?atob(preSaveDrawing):''
    };
    $scope.categorias = [];

    $scope.checkDrawingStatus = function(event){
        if($scope.data.texto){
            window.localStorage.setItem('preSaveDrawing',btoa($scope.data.texto));
            $scope.hasToPreSaveDrawing = true;
        }
        else if($scope.hasToPreSaveDrawing){
            window.localStorage.removeItem('preSaveDrawing');
            $scope.hasToPreSaveDrawing = false;
        }
    }

    $scope.runningInterval = $interval($scope.checkDrawingStatus,500)
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
        $scope.categorias = data;
    });

    $scope.go = function(path){
         $location.path(path);
    }

    $scope.enviar = function(){
            var n_data = {};
            n_data.categoria = $scope.data.categoria;
            n_data.titulo = $scope.data.titulo;
            n_data.texto = btoa($scope.data.texto);
        WordingService.sendWording(n_data).then(
            function(response){
                $scope.success = true;
                $interval.cancel($scope.runningInterval);
                window.localStorage.removeItem('preSaveDrawing');
                $timeout(function(){
                    $location.path('/dashboard');
                },2000);
            },
            function(error){
                console.log('deu ruim');
                $scope.errors = error.errors;
            }
        );
    }

});
