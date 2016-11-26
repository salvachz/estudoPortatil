app
.service('UserService', function(CONFIG, $q, $http, $httpParamSerializer){
    var that = {

        login: function(data){
            var q = $q.defer();
            $http({
                    url: CONFIG.WS_URL+'/auth/login/',
                    method: "POST",
                    data: $httpParamSerializer(data),
                    //data: data,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })
                .then(
                function(response){
                q.resolve(response.data);
                },
                function(error){
                    console.log('error on login HTTP',JSON.stringify(error));
                    q.reject(error)
                }
            );
            return q.promise

        }
    }
    return that;
});
