angular.module('newser.controller', [])
    .controller('NewsListCtrl', function ($scope, $ionicLoading, DataService, UserService) {
        $scope.items = null;
        $ionicLoading.show();

        UserService.idUser();

        DataService.fetch(function (response) {
            $scope.items = response;

            $ionicLoading.hide();
        });

        $scope.fetchItem = function() {

        };

        var deleteItem = function (item) {
            setTimeout(function () {
                $scope.$apply(
                    function () {
                        item.deleted = true;
                    }
                )
            }, 200);
        };

        $scope.skip = function(item) {
            item.like = false;
            item.dislike = false;
            item.skip = true;

            var event = {
                hash: item.hash,
                user: UserService.getUserId(),
                decision: 'skip',
                time: Math.floor((Math.random() * 10) + 1),
                title: item.title
            };

            deleteItem(item);

            DataService.pushEvent(event);
        };

        $scope.like = function(item) {
            item.like = true;
            item.dislike = false;
            item.skip = false;

            var event = {
                hash: item.hash,
                user: UserService.getUserId(),
                decision: 'like',
                time: Math.floor((Math.random() * 10) + 1),
                title: item.title
            };

            deleteItem(item);

            DataService.pushEvent(event);
        };

        $scope.dislike = function(item) {
            item.like = false;
            item.dislike = true;
            item.skip = false;

            var event = {
                hash: item.hash,
                user: UserService.getUserId(),
                decision: 'dislike',
                time: Math.floor((Math.random() * 10) + 1),
                title: item.title
            };

            deleteItem(item);

            DataService.pushEvent(event);
        }
    });
