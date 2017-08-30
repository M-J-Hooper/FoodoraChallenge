module.exports = function(dataSource) {
    var http = require('http');
    var DataSet = require("./location.js").DataSet;
    
    var getData = function(url) {
        return new Promise(function(resolve, reject) {
            var request = http.get(url, function(response) {
                response.setEncoding('utf8');
                if (response.statusCode < 200 || response.statusCode > 299) {
                    reject(new Error('Failed to get data: ' + response.statusCode));
                }
                response.on('data', data => resolve(data));
            });
            request.on('error', err => reject(err));
        });
    };
    
    var getJsonData = function() {
        return new Promise(function(resolve, reject) {
            getData(dataSource)
                .then(data => resolve(new DataSet(data).data))
                .catch(err => reject(err));
        });
    };
    
    var getCsvData = function() {
        return new Promise(function(resolve, reject) {
            getData(dataSource)
                .then(data => resolve(new DataSet(data).parseToCsvString()))
                .catch(err => reject(err));
        });
    }
    
    return {
        getJsonData: getJsonData,
        getCsvData: getCsvData
    };
}('http://pastebin.com/raw/943PQQ0n');
