app
.service('UserService', function(CONFIG, $q, $http, $httpParamSerializer, $cookies){
    var that = {

        is_loged: false,

        login: function(data){
            var q = $q.defer();
            $http({
                    url: CONFIG.WS_URL+'/auth/',
                    method: "POST",
                    data: $httpParamSerializer(data),
                    //data: data,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })
                .then(
                function(response){
                    if($cookies.get('is_logged')=='True')
                        that.is_loged = true;
                q.resolve(response.data);
                },
                function(error){
                    console.log('error on login HTTP',JSON.stringify(error));
                    q.reject(error)
                }
            );
            return q.promise

        },

        createUser: function(data){
            var q = $q.defer();
            $http({
                    url: CONFIG.WS_URL+'/create_account/',
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

        },
    }
    if($cookies.get('is_logged')=='True')
        that.is_loged = true;
    return that;
});
