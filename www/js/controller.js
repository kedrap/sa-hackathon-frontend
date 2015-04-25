angular.module('newser.controller', [])
    .controller('NewsListCtrl', function ($scope, $ionicLoading, DataService, UserService) {
        $scope.items = null;
        $ionicLoading.show();

        UserService.idUser();

        DataService.fetch(function (response) {
            $scope.items = response;

            $ionicLoading.hide();
        });

        $scope.like = function(item) {
            item.like = false;
            item.dislike = false;
            item.skip = false;

            var event = {
                hash: item.hash,
                user: UserService.getUserId(),
                decision: 'like',
                time: Math.floor((Math.random() * 10) + 1),
                title: item.title
            };

            DataService.pushEvent(event);
        };

        $scope.like = function(item) {
            item.like = true;
            item.dislike = false;

            var event = {
                hash: item.hash,
                user: UserService.getUserId(),
                decision: 'like',
                time: Math.floor((Math.random() * 10) + 1),
                title: item.title
            };

            DataService.pushEvent(event);
        };

        $scope.dislike = function(item) {
            item.like = false;
            item.dislike = true;

            var event = {
                hash: item.hash,
                user: UserService.getUserId(),
                decision: 'dislike',
                time: Math.floor((Math.random() * 10) + 1),
                title: item.title
            };

            DataService.pushEvent(event);
        }
    });
