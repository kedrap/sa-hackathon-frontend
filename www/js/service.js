angular.module('newser.service', [])
    .factory('TimerService', function () {
        var service = {
            startTimer: function () {
                window.timer = new Date();
            },
            getTimeSpentReading: function () {
                var curTime = new Date(),
                    timeSpent = curTime - window.timer;

                return timeSpent/1000;
            }
        };

        return service;
    })
    .factory('UserService', function () {
        var service = {
            hashCode: function (seed) {
                var hash = 0, i, chr, len;
                if (seed == 0) return hash;
                for (i = 0, len = seed.length; i < len; i++) {
                    chr = seed.charCodeAt(i);
                    hash = ((hash << 5) - hash) + chr;
                    hash |= 0;
                }
                return Math.abs(hash);
            },
            getUserId: function () {
                return JSON.parse(window.localStorage.newster).uuid;
            },
            idUser: function () {
                if (typeof(window.localStorage) != 'undefined') {
                    var newsterData;

                    try {
                        newsterData = JSON.parse(window.localStorage.newster);
                    } catch (e) {
                        newsterData = {};
                    }

                    newsterData.uuid =  service.hashCode(new Date().toString());
                    window.localStorage.newster = JSON.stringify(newsterData);
                }
            }
        };

        return service;
    })
    .factory('DataService', function ($http) {
        var mockData = 'data_v1.json',
            urlBase = 'http://backend.mysql5.pl',
            apiUrl = urlBase + '/api/events',
            items = [],
            getUniqueItem = function () {
                var newsterData;

                try {
                    newsterData = JSON.parse(window.localStorage.newster);
                } catch (e) {
                    newsterData = {};
                }

                newsterData.alreadyPresentedArticles = newsterData.alreadyPresentedArticles || {};

                for (var key in items) {
                    if (Object.keys(newsterData.alreadyPresentedArticles).indexOf(items[key].hash) !== -1) {
                        delete items[key];
                    } else {
                        var item = items[key];
                        delete items[key];

                        newsterData.alreadyPresentedArticles[item.hash] = item.hash;
                        window.localStorage.newster = JSON.stringify(newsterData);

                        return item;
                    }
                }
            },
            getTakeABreakItem = function () {
                return {
                    'title': 'Take a break, you asshole'
                };
            },
            getReachEndOfInternetItem = function () {
                return {
                    'title': 'Reached end of the internet, you asshole'
                }
            },
            callCounter = 0,
            service = {
                fetchUniqueItem: function (callback) {
                    callCounter++;
                    if (callCounter % 10 == 0) {
                        callback(getTakeABreakItem());
                    }

                    if (items.length === 0) {
                        $http({
                            method: "GET",
                            url: mockData
                        }).success(function (response) {
                            items = response;

                            var item = getUniqueItem() || getReachEndOfInternetItem();
                            callback(item);
                        });
                    } else {
                        callback(getUniqueItem());
                    }
                },
                pushEvent: function (event) {
                    var newsterData;

                    try {
                        newsterData = JSON.parse(window.localStorage.newster);
                    } catch (e) {
                        newsterData = {};
                    }

                    newsterData.alreadyPresentedArticles = newsterData.alreadyPresentedArticles || {};
                    newsterData.alreadyPresentedArticles[event.hash] = event.hash;
                    window.localStorage.newster = JSON.stringify(newsterData);

                    $http({
                        url: apiUrl,
                        method: 'POST',
                        data: event,
                        transformRequest: function (obj) {
                            var str = [];
                            for (var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).success(function (response, status) {
                        console.log(arguments, 'data sent');
                    }).error(function () {
                        console.log(arguments, 'data error');
                    });
                }
            };

        return service;
    });
