app.controller('DashboardCtrl', function(WordingService, $scope, $location) {

    $scope.writtens = [];

    //Written
    WordingService.getMineWordingList().then(
        function(data){
            $scope.writtens = data;
            console.log('deu boa o mine');
        },
        function(error){
        }
    )

});
