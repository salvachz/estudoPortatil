app.controller('DashboardCtrl', function(WordingService, UserService, $scope, $location) {

    console.log('no dash');

    $scope.go = function(path){
         $location.path(path);
    }

    $scope.getNextWording = function(){
        console.log('aha');
        WordingService.getWordingList().then(
            function(response){
                $location.path('corrigir-redacao/'+response[0].id);
            },
            function(error){
            }
        );
    }

});
