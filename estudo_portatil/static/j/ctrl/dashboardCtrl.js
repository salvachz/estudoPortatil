app.controller('DashboardCtrl', function(UserService, $scope, $location) {

    console.log('no dash');

    $scope.go = function(path){
         $location.path(path);
    }

});
