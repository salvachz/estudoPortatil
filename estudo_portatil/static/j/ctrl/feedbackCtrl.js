app.controller('FeedbackCtrl', function($scope, $location, FeedbackService) {

    $scope.sts = {
        feedback : false,
        form : true,
        quack : false,
        success : false
    }
    $scope.errors = [];


    $scope.feedback = {
        assunto:'',
        mensagem: ''
    }
    
    $scope.showFeedback = function(){
        $scope.sts.feedback = true;
    }

    $scope.send = function(){
        $scope.sts.form = false;
        $scope.sts.quack = true;
        var cp_feedback= angular.copy($scope.feedback);
        $scope.feedback.assunto = '';
        $scope.feedback.mensagem = '';
        FeedbackService.sendFeedback(cp_feedback).then(
            function(data){
                console.log('Deu boa! enviou o feedback');
                $scope.showThankyou();
            },function(data){
                $scope.errors = data.errors;
                $scope.sts.form = true;
                $scope.sts.quack = false;
                console.log('Deu ruim no feed back ""/');
            });
    };

    $scope.showThankyou = function(){
        $scope.sts.form = false;
        $scope.sts.quack = false;
        $scope.sts.success= true;
    };

    $scope.close = function(){
        $scope.sts = {
            feedback : false,
            form : true,
            quack : false,
            success : false
        };
    }

});
