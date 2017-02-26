app.controller('DashboardCtrl', function(WordingService, $scope, $location) {

    $scope.writtens = [];
    $scope.corrections = [];

    //Written
    WordingService.getWrittenWordingList().then(
        function(data){
            $scope.writtens = data;
            console.log('deu boa o writtens');
        },
        function(error){
        }
    );

    //Correction
    WordingService.getCorrectionWordingList().then(
        function(data){
            $scope.corrections = data;
            console.log('deu boa o corrections');
        },
        function(error){
        }
    );


});
