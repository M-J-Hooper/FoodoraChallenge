/*global angular*/
var app = angular.module('foodoraApp', []);

app.controller('mainCtrl', function($scope, $http) {
    //array to populate with locations
    $scope.data = [];
    
    $scope.showData = function() {
        //makes request to api to get data to show
    	$http.get('/api/show')
            .success(data => $scope.data = data) //show data
            .error(err => console.log('Error:', err));
    };
    
    $scope.downloadData = function() {
        //makes request to api to get data to download
    	$http.get('/api/download')
            .success(function(data, status, headers) {
                //create an invisible element for seamless download
                var a = document.createElement('a');
                a.href = 'data:attachment/csv,' + encodeURI(data);
                a.target = '_blank';
                a.download = 'locations.csv';
                a.click(); //trigger download by simulating clicked link
            }).error(err => console.log('Error:', err));
    };
});