app.controller('LoginCtrl', function(UserService, $scope) {

    $scope.data = {};

    $scope.login = function(){
        console.log($scope.data);
        UserService.login($scope.data);
    }

});
