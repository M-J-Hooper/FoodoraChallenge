/*global angular*/
var app = angular.module('foodoraApp', []);

app.controller('mainCtrl', function($scope, $http) {
    $scope.data = [];
    
    $scope.showData = function() {
    	$http.get('/api/show')
            .success(data => $scope.data = data)
            .error(err => console.log('Error:', err));
    };
    
    $scope.downloadData = function() {
    	$http.get('/api/download')
            .success(function(data, status, headers) {
                var a = document.createElement('a');
                a.href = 'data:attachment/csv,' + encodeURI(data);
                a.target = '_blank';
                a.download = 'locations.csv';
                a.click();
            }).error(err => console.log('Error:', err));
    };
});