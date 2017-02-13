app
.service('CategoryService', function(CONFIG, $q, $http, $httpParamSerializer, $cookies){
    var that = {

        getCategoryList: function(){
            var q = $q.defer();
            $http.get(CONFIG.WS_URL+'/category/')
                .then(
                function(response){
                    q.resolve(response.data);
                },
                function(error){
                    console.log('error on getCategoryList HTTP',JSON.stringify(error));
                    q.reject(error)
                }
            );
            return q.promise

        },

    }
    return that;
});
