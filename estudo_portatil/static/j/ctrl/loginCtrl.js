app.controller('LoginCtrl', function(UserService, $scope, $location) {

    $scope.data = {};

    $scope.login = function(){
        UserService.login($scope.data).then(
            function(result){
                if(UserService.is_loged)
                    $location.path('/dashboard');
                else
                    console.log('deu ruim');
            },
            function(error){
                console.log('error '+error);
            }
        );
        
    }

});
