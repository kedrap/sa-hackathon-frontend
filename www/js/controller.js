angular.module('newser.controller', [])
    .controller('NewsListCtrl', function ($scope, $ionicLoading, DataService) {
        $scope.items = null;
        $ionicLoading.show();

        DataService.fetch(function (response) {
            $scope.items = response;

            $ionicLoading.hide();
        });

        $scope.like = function(item) {
            item.like = true;
            item.dislike = false;
        };

        $scope.dislike = function(item) {
            item.like = false;
            item.dislike = true;
        }
    });
