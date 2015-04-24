angular.module('newser.controller', [])
    .controller('NewsListCtrl', function ($scope, DataService) {
        $scope.items = ['TODO #1', 'TODO #2', '#Jeba*Biede'];

        console.log(DataService.fetch(function(response, status){
            $scope.items = response;
        }));
    });
