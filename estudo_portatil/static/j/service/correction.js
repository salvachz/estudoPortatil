app
.service('CorrectionService', function(CONFIG, $q, $http, $httpParamSerializer, $cookies){
    var that = {
        saveCorrection: function(data){
            var q = $q.defer();
            $http({
                    url: CONFIG.WS_URL+'/correction/',
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
                    console.log('error on saveCorrection HTTP',JSON.stringify(error));
                    q.reject(error)
                }
            );
            return q.promise

        },

        getCorrectionItemList: function(correction_id){
            var q = $q.defer();
            $http.get(CONFIG.WS_URL+'/correction/'+correction_id+'/')
                .then(
                function(response){
                    q.resolve(response.data);
                },
                function(error){
                    console.log('error on getCorrectionItemList HTTP',JSON.stringify(error));
                    q.reject(error)
                }
            );
            return q.promise

        },


    }
    return that;
});
