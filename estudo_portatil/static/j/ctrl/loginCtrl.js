app.controller('LoginCtrl', function(UserService, $scope, $location) {

    $scope.data = {image:null};
    $scope.show_register = false;
    $scope.error = {msg:false};
    $scope.register_error = {msg:false};
    $scope.created = {success:false};

    //If is already logged
    if(UserService.is_loged)
        $location.path('/dashboard');

    $scope.login = function(){
        UserService.login($scope.data).then(
            function(result){
                if(result.login)
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

    $scope.fbLogin = function(){
        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                var access_token =   FB.getAuthResponse()['accessToken'];
                $scope.data.fb_token = access_token;
                $scope.login();
             /*FB.api('/me', function(response) {
               console.log('Good to see you, ' + response.name + '.');
             });*/
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'email'});
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
                $scope.created.success = true;
                $location.path('/dashboard');
            },
            function(error){
                $scope.register_error.data = error.data.errors;
            }
        );
    }

});
