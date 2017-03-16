app.controller('ConfirmarEmailCtrl', function(UserService, $scope, $routeParams) {

    $scope.status = 'loading';

    $scope.data = {};
    $scope.data.email = $routeParams.email;
    $scope.data.key = $routeParams.key;

    UserService.validateEmail($scope.data).then(function(data){
        if(data.validated)
            $scope.status = 'success';
        else
            $scope.status = 'failed';
    });

});
