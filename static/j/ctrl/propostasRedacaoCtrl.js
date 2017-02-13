app.controller('PropostasRedacaoCtrl', function(UserService, WordingService, $scope, $location) {

    console.log('na proposta');
    $scope.wordingList = [];

    $scope.go = function(path){
         $location.path(path);
    }

    WordingService.getWordingList().then(
        function(wordingList){
            $scope.wordingList = wordingList;
        },
        function(error){
        }
    );

    $scope.goRedacao = function(id){
        $location.path('/corrigir-redacao/'+id);
    }
    

});
