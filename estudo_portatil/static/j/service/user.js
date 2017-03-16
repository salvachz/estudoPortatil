app
.service('UserService', function(CONFIG, $q, $http, $httpParamSerializer, $cookies,$window){
    var that = {

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
                    q.resolve(response.data);
                },
                function(error){
                    console.log('error on login HTTP',JSON.stringify(error));
                    q.reject(error)
                }
            );
            return q.promise

        },

        validateEmail: function(data){
            var q = $q.defer();
            $http({
                    url: CONFIG.WS_URL+'/confirmation-email/',
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
                    console.log('error on validateEmail HTTP',JSON.stringify(error));
                    q.reject(error)
                }
            );
            return q.promise

        },

        me: function(){
            var q = $q.defer();
            $http({
                    url: CONFIG.WS_URL+'/me/',
                    method: "GET",
                })
                .then(
                function(response){
                    var data = response.data;
                    if(data.image)
                        data.image = CONFIG.HOST+'/lyra/'+data.image;
                    q.resolve(response.data);
                },
                function(error){
                    console.log('error on me HTTP',JSON.stringify(error));
                    q.reject(error)
                }
            );
            return q.promise

        },

        logout: function(){
            FB.getLoginStatus(function(response){
                if (response && response.status === 'connected') {
                    console.log('aqui no token log')
                    FB.logout(function(response){
                        console.log('deslogou..')
                        console.log(response)
                        return that.__logout();
                    });
                }
            })
            return that.__logout();
        },

        __logout: function(){
            var q = $q.defer();
            $http({
                    url: CONFIG.WS_URL+'/auth/',
                    method: "DELETE",
                })
                .then(
                function(response){
                    q.resolve(response.data);
                },
                function(error){
                    console.log('error on __logout HTTP',JSON.stringify(error));
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
    return that;
});
