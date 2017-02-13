app.controller('CorrigirRedacaoCtrl', function(WordingService, CorrectionService, $scope, $location,  $routeParams, CONFIG) {

    console.log('no corrigir redacao');
    var wording_id = $routeParams.id;
    console.log(wording_id);
    $scope.topics = CONFIG.TOPIC_INFO;
    $scope.data = {
        wording_id:wording_id
    }


    WordingService.getWording(wording_id).then(
        function(wording){
            wording.text = atob(wording.text);
            $scope.wording = wording;
            CorrectionService.getCorrectionItemList(wording_id).then(
                function(data){ 
                        $scope.data.score = data.score;
                    for(var x in data.correctionitem_set)
                        $scope.data[data.correctionitem_set[x].number.toString()] = data.correctionitem_set[x].item_text;
                    console.log($scope.data);
                    $scope.data.wording_id = wording_id;
                },
                function(error){
                }
            );
        },
        function(error){
        }
    );

    $scope.go = function(path){
         $location.path(path);
    }

    $scope.enviar = function(){
        CorrectionService.saveCorrection($scope.data);
    }


});
