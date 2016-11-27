app
.service('WordingService', function(CONFIG, $q, $http, $httpParamSerializer, $cookies){
    var that = {

        is_loged: false,

        getWordingList: function(data){
            var q = $q.defer();
            $http.get(CONFIG.WS_URL+'/wording/')
                .then(
                function(response){
                    q.resolve(response.data);
                },
                function(error){
                    console.log('error on getWordingList HTTP',JSON.stringify(error));
                    q.reject(error)
                }
            );
            return q.promise

        }
    }
    return that;
});
