angular.module('newser.service', [])
    .factory('UserService', function() {

        function hashCode (seed) {
            var hash = 0, i, chr, len;
            if (seed == 0) return hash;
            for (i = 0, len = seed; i < len; i++) {
                chr   = seed.charCodeAt(i);
                hash  = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        }

        if (typeof(window.localStorage) != 'undefined') {
            window.localStorage.newster = window.localStorage.newster || {};
            window.localStorage.newster.uuid = hashCode(new Date());
        }

        console.log(window.localStorage);
    })
    .factory('DataService', function ($http) {
        var mockData = 'data_v1.json',
            service = {
                fetch: function (callback) {
                    var res = $http({
                        method: "GET",
                        url: mockData
                    }).success(callback || angular.noop);
                },
                //like, dislike, skip,
                //POST[title, decision, time, user]
                pushEvent: function(event){}
            };

        return service;
    });
