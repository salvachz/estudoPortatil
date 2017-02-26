app
.service('WordingService', function(CONFIG, $q, $http, $httpParamSerializer, $cookies){
    var that = {

        is_loged: false,

        getWordingList: function(){
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

        },

        getWrittenWordingList: function(){
            var q = $q.defer();
            $http.get(CONFIG.WS_URL+'/wording/written/')
                .then(
                function(response){
                    q.resolve(response.data);
                },
                function(error){
                    console.log('error on getWrittenWordingList HTTP',JSON.stringify(error));
                    q.reject(error)
                }
            );
            return q.promise

        },

        getCorrectionWordingList: function(){
            var q = $q.defer();
            $http.get(CONFIG.WS_URL+'/wording/correction/')
                .then(
                function(response){
                    var data = response.data;
                    for(var x=0;x<data.length;x++){
                        if(data[x].written_by.image)
                            data[x].written_by.image = CONFIG.HOST+'/lyra/'+data[x].written_by.image;
                    }
                    q.resolve(data);
                },
                function(error){
                    console.log('error on getCorrectionWordingList HTTP',JSON.stringify(error));
                    q.reject(error)
                }
            );
            return q.promise

        },

        getWording: function(id){
            var q = $q.defer();
            $http.get(CONFIG.WS_URL+'/wording/'+id+'/')
                .then(
                function(response){
                    var data = response.data;
                    if(data.written_by.image)
                        data.written_by.image = CONFIG.HOST+'/lyra/'+data.written_by.image;
                    q.resolve(data);
                },
                function(error){
                    console.log('error on getWording ID '+id+' HTTP',JSON.stringify(error));
                    q.reject(error)
                }
            );
            return q.promise

        },
        sendWording: function(data){
            var q = $q.defer();
            $http({
                    url: CONFIG.WS_URL+'/wording/',
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
                    console.log('error on sendWording HTTP',JSON.stringify(error));
                    q.reject(error.data)
                }
            );
            return q.promise

        },

    }
    return that;
});
