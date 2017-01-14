app
.service('UserService', function(CONFIG, $q, $http, $httpParamSerializer, $cookies,$window){
    var that = {

        is_loged: false,
        fb_token: false,

        fbAuthChange: function(data){
            console.log('dentro da');
        },

        login: function(data){
            if(data.fb_token)
                $window.localStorage.setItem('fb_token',data.fb_token);
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
                    if(response.data.login){
                        $cookies.put('logged', 'True');
                        that.is_loged = true;
                    }
                q.resolve(response.data);
                },
                function(error){
                    console.log('error on login HTTP',JSON.stringify(error));
                    q.reject(error)
                }
            );
            return q.promise

        },

        logout: function(){
            var q = $q.defer();
            if(that.fb_token){
                console.log('aqui no token log')
                FB.logout(function(response){
                    $window.localStorage.deleteItem('fb_token')
                    console.log('deslogou..')
                    console.log(response)
                    that.fb_token = false;
                    that.is_loged = false;
                    q.resolve(response);
                },
                function(response){
                    console.log('deu ruim..')
                })
            }
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
    if($cookies.get('logged')=='True')
        that.is_loged = true;
    that.fb_token = $window.localStorage.getItem('fb_token',false);
    return that;
});
