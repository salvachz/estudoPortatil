app.controller('RightMenuCtrl', function(UserService, $scope, $location) {

    $scope.usr = {};


    UserService.me().then(function(data){
        $scope.usr = data;
        angular.forEach(data, function(value, key) {
          this[key] = value;
        }, $scope.usr);
    })

    $scope.logout = function(){
        console.log('eh');
        console.log(UserService);
        UserService.logout().then(function(data){
            console.log('data'+data);
            $location.path('/login');
        })
    }
});
