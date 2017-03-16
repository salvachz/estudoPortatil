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
        texto:preSaveDrawing?decodeURIComponent(escape(atob(preSaveDrawing))):''
    };
    $scope.categorias = [];

    $scope.checkDrawingStatus = function(event){
        if($scope.data.texto){
            window.localStorage.setItem('preSaveDrawing',btoa(unescape(encodeURIComponent($scope.data.texto))));
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

    $scope.hasMinSize = function(text){
        var tmp,minSize,splited, minWords = 30;
        splited = text.split(" ");
        tmp = text.replace(/ /g,"");
        minChars = 3 * splited.length;
        if((splited.length<minWords) || (tmp.length < minChars))
            return false;
        return true;
    };

    $scope.enviar = function(){
            if(!$scope.hasMinSize($scope.data.texto)){
                $scope.errors = ['texto muito pequeno "/'];
                return false;
            }

            var n_data = {};
            n_data.categoria = $scope.data.categoria;
            n_data.titulo = $scope.data.titulo;
            n_data.texto = btoa(unescape(encodeURIComponent($scope.data.texto)));
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
