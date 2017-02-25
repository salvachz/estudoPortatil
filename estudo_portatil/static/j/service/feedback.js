app
.service('FeedbackService', function(CONFIG, $q, $http, $httpParamSerializer, $cookies){
    var that = {

        sendFeedback: function(data){
            var q = $q.defer();
            $http({
                    url: CONFIG.WS_URL+'/feedback/',
                    method: "POST",
                    data: $httpParamSerializer(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })
                .then(
                function(response){
                q.resolve(response.data);
                },
                function(error){
                    console.log('error on sendFeedback HTTP',JSON.stringify(error));
                    q.reject(error.data)
                }
            );
            return q.promise

        },

    }
    return that;
});
