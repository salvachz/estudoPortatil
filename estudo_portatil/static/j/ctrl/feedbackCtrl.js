app.controller('FeedbackCtrl', function($scope, $location, FeedbackService) {

    $scope.stsFeedback = true;


    $scope.feedback = {
        subject:'',
        text: ''
    }
    
    $scope.showFeedback = function(){
        $scope.stsFeedback = true;
    }

    $scope.send = function(){
        FeedbackService.sendFeedback($scope.feedback).then(
            function(data){
                console.log('Deu boa! enviou o feedback');
            },function(data){
                console.log('Deu ruim no feed back ""/');
            });
    }

});
