/*global angular*/
var app = angular.module('foodoraApp', []);

app.controller('mainCtrl', function($scope, $http) {
    $scope.data = [];
    
    $scope.showData = function() {
    	$http.get('/api/show')
            .success(function(data) {
                $scope.data = data;
                console.log(data);
            })
            .error(function(err) {
                console.log('Error:', err);
            });
    };
    
    $scope.downloadData = function() {
    	$http.get('/api/download')
            .success(function(data) {
                console.log(data);
            })
            .error(function(err) {
                console.log('Error:', err);
            });
    };
});