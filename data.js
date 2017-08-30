//data layer for retrieval of raw data, independant of data structure

module.exports = function(dataSource) {
    var http = require('http');
    
    //can use any implementation of DataWrapper with a data prop
    //must implement parseToCsvString function 
    var DataWrapper = require("./location.js").DataWrapper;
    
    //request data from source and resolve with a DataWrapper
    var getData = function(url) {
        return new Promise(function(resolve, reject) {
            var request = http.get(url, function(response) {
                response.setEncoding('utf8');
                if (response.statusCode < 200 || response.statusCode > 299) {
                    reject(new Error('Failed to get data: ' + response.statusCode));
                }
                response.on('data', data => resolve(new DataWrapper(data)));
            });
            request.on('error', err => reject(err));
        });
    };
    
    //pass along the promise to the server layer which resolves when data loaded
    var getJsonData = function() {
        return new Promise(function(resolve, reject) {
            getData(dataSource)
                .then(wrap => resolve(wrap.data))
                .catch(err => reject(err));
        });
    };
    
    //pass along the promise to the server layer which resolves when data loaded and parsed to csv
    var getCsvData = function() {
        return new Promise(function(resolve, reject) {
            getData(dataSource)
                .then(wrap => resolve(wrap.parseToCsvString()))
                .catch(err => reject(err));
        });
    }
    
    //return functions to be exported for use in server layer
    return {
        getJsonData: getJsonData,
        getCsvData: getCsvData
    };
}('http://pastebin.com/raw/943PQQ0n'); //pass in data source
