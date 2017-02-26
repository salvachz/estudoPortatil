app.controller('CorrigirRedacaoCtrl', function(WordingService, CorrectionService, $scope, $location,  $routeParams, CONFIG) {

    console.log('no corrigir redacao');
    $scope.scores = [];
    for(var x=1;x<=10;x++)
        $scope.scores.push({id:x,name:(x< 10 ? '0' : '') + x})

    $scope.generateSlug = function(value) {
          // 1) convert to lowercase
          // 2) remove dashes and pluses
          // 3) replace spaces with dashes
          // 4) remove everything but alphanumeric characters and dashes
          return value.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    };

    $scope.getNextWording = function(){
        console.log('aha, pegando nova getNextWording');
        WordingService.getWordingList().then(
            function(response){
                $location.path('corrigir-redacao/'+response[0].id+'/'+$scope.generateSlug(response[0].title)).replace();
            },
            function(error){
            }
        );
    }


    var wording_id = $routeParams.id;
    var page_title = $routeParams.title;
    console.log(wording_id);
    if(!wording_id){
        $scope.getNextWording();
        return;
    }
    $scope.topics = CONFIG.TOPIC_INFO;
    $scope.data = {
        wording_id: wording_id,
        score: 1
    }


    WordingService.getWording(wording_id).then(
        function(wording){
            var slug = $scope.generateSlug(wording.title);
            if(slug != page_title)
                $location.path('corrigir-redacao/'+wording.id+'/'+slug).replace();

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
