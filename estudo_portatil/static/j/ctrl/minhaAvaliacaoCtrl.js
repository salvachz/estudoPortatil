app.controller('MinhaAvaliacaoCtrl', function(WordingService, CorrectionService, $scope, $location,  $routeParams, CONFIG, $timeout) {

    console.log('no minha avaliacao');
    $scope.generateSlug = function(value) {
          // 1) convert to lowercase
          // 2) remove dashes and pluses
          // 3) replace spaces with dashes
          // 4) remove everything but alphanumeric characters and dashes
          return value.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    };

    var wording_id = $routeParams.id;
    var page_title = $routeParams.slug;
    console.log(wording_id);
    console.log(page_title);
    if(!wording_id){
        $location.path('/dashboard').replace();
    }
    $scope.topics = CONFIG.TOPIC_INFO;
    $scope.data = {}


    WordingService.getWording(wording_id).then(
        function(wording){
            var slug = $scope.generateSlug(wording.title);
            if(slug != page_title)
                $location.path('minha-reavaliacao/'+wording.id+'/'+slug).replace();

            wording.text = decodeURIComponent(escape(window.atob(wording.text)));
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


});
