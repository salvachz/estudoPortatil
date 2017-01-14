app.controller('RightMenuCtrl', function(UserService, $scope, $location) {


    $scope.logout = function(){
        console.log('eh');
        console.log(UserService);
        UserService.logout().then(function(data){
            $location.path('/login');
        })
    }
});
