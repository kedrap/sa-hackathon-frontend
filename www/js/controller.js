angular.module('newser.controller', [])
    .controller('NewsListCtrl', function ($scope, $ionicLoading, DataService, UserService, TimerService, $ionicScrollDelegate, DecisionService, $timeout) {
        $scope.items = null;
        $ionicLoading.show();

        UserService.idUser();

        $scope.scrollTop = function () {
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        };

        $scope.fetchItem = function () {
            $ionicLoading.show();
            DataService.fetchUniqueItem(function (item) {
                if ($scope.item) {
                    $scope.item.image = null;
                }

                $timeout(function () {
                    $scope.item = item;

                    TimerService.startTimer();

                    $scope.scrollTop();
                    $ionicLoading.hide();
                }, 0);
            });
        };

        var nextItem = function () {
            $timeout(function () {
                $scope.$apply(
                    function () {
                        $scope.fetchItem();
                    }
                )
            }, 500);
        };

        $scope.skip = function (item) {
            item.like = false;
            item.dislike = false;
            item.skip = true;

            var event = {
                hash: item.hash,
                user: UserService.getUserId(),
                decision: 'skip',
                time: TimerService.getTimeSpentReading(),
                title: item.title,
                type: item.type || 'article'
            };

            DecisionService.save('skip');

            DataService.pushEvent(event);

            nextItem(item);
        };

        $scope.like = function (item) {
            item.like = true;
            item.dislike = false;
            item.skip = false;

            var event = {
                hash: item.hash,
                user: UserService.getUserId(),
                decision: 'like',
                time: TimerService.getTimeSpentReading(),
                title: item.title,
                type: item.type || 'article'
            };

            DecisionService.save('interested');

            DataService.pushEvent(event);

            nextItem(item);
        };

        $scope.dislike = function (item) {
            item.like = false;
            item.dislike = true;
            item.skip = false;

            var event = {
                hash: item.hash,
                user: UserService.getUserId(),
                decision: 'dislike',
                time: TimerService.getTimeSpentReading(),
                title: item.title,
                type: item.type || 'article'
            };

            DecisionService.save('not interested');

            DataService.pushEvent(event);

            nextItem(item);
        };

        $scope.fetchItem();
    });
