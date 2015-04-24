angular.module('newser.service', [])
    .factory('DataService', function ($http) {
        var mockData = 'data_v1.json',
            service = {
                fetch: function (callback) {
                    var res = $http({
                        method: "GET",
                        url: mockData
                    }).success(callback || angular.noop);
                }
            };

        return service;
    });
