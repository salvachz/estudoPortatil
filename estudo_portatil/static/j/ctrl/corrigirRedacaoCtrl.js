app.controller('CorrigirRedacaoCtrl', function(WordingService, $scope, $location,  $routeParams) {

    console.log('no corrigir redacao');
    var wording_id = $routeParams.id;
    console.log(wording_id);

    WordingService.getWordingList(wording_id).then(
        function(wording){
            $scope.wording = wording;
        },
        function(error){
        }
    );

    $scope.go = function(path){
         $location.path(path);
    }

});
