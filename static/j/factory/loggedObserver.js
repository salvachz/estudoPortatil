app.factory('LoggedObserver', function responseObserver($q, $location) {
    return {
        'responseError': function(errorResponse) {
            switch (errorResponse.status) {
            case 403:
                $location.path('/login');
                break;
            case 500:
                $location.path('/error');
                break;
            }
            return $q.reject(errorResponse);
        }
    };
})
