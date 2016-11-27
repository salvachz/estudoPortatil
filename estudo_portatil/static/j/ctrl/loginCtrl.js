app.controller('LoginCtrl', function(UserService, $scope, $location) {

    $scope.data = {};
    $scope.show_register = false;

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

    $scope.showRegister = function(){
        $scope.show_register = true;
    }

    $scope.closeRegister = function(){
        $scope.show_register = false;
    }

});
