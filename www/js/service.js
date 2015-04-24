angular.module('newser.service', [])
    .factory('UserService', function () {
        var service = {
            hashCode: function (seed) {
                var hash = 0, i, chr, len;
                if (seed == 0) return hash;
                for (i = 0, len = seed.length; i < len; i++) {
                    chr = seed.charCodeAt(i);
                    hash = ((hash << 5) - hash) + chr;
                    hash |= 0; // Convert to 32bit integer
                }
                return hash;
            },
            getUserId: function() {
                return JSON.parse(window.localStorage.newster).uuid;
            },
            idUser: function () {
                if (typeof(window.localStorage) != 'undefined') {
                    window.localStorage.newster = window.localStorage.newster || {};
                    window.localStorage.newster = JSON.stringify({
                        uuid: service.hashCode(new Date().toString())
                    });
                }
            }
        };

        return service;
    })
    .factory('DataService', function ($http) {
        var mockData = 'data_v1.json',
            apiUrl = 'http://backend.mysql5.pl/api/events',
            service = {
                fetch: function (callback) {
                    var res = $http({
                        method: "GET",
                        url: mockData
                    }).success(callback || angular.noop);
                },
                pushEvent: function (event) {
                    $http.post(apiUrl, {
                        event: event
                    }).success(function (response, status) {
                        console.log(arguments, 'data sent');
                    }).error(function () {
                        console.log(arguments, 'data error');
                    });
                }
            };

        return service;
    });
