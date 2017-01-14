app.controller('LoginCtrl', function(UserService, $scope, $location) {

    $scope.data = {};
    $scope.show_register = false;
    $scope.error = {msg:false}

    $scope.login = function(){
        UserService.login($scope.data).then(
            function(result){
                if(UserService.is_loged)
                    $location.path('/dashboard');
                else{
                    console.log('deu ruim');
                    $scope.error.msg = result.msg;
                }
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


    $scope.cadastrar = function(){
        UserService.createUser($scope.data).then(
            function(response){
                console.log('deu boa');
            },
            function(error){
            }
        );
    }

});
