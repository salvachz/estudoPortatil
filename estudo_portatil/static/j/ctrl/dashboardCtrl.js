app.controller('DashboardCtrl', function(WordingService, $scope, $location) {

    $scope.writtens = [];
    $scope.corrections = [];

    $scope.goTo = function(path){
        //console.log(path);
        $location.path(path);
    }

    $scope.generateSlug = function(value) {
          // 1) convert to lowercase
          // 2) remove dashes and pluses
          // 3) replace spaces with dashes
          // 4) remove everything but alphanumeric characters and dashes
          return value.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    };

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
