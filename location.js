module.exports = function() {
    function Location(code, name) {
        this.code = code;
        this.name = name;
    }
    
    var parseToJson = function(data) {
        data = data.split('\r\n');
        var arr = [];
                
        var start = false;
        for(let line of data) {
            if(start) {
                var i = line.indexOf(' ');
                var loc = new Location(line.substr(0,i), line.substr(i+1).trim());
                arr.push(loc);
            }
            else if(line === '') start = true;
        }
        return arr;
    };
    
    var parseToCsv = function(data) {
        data = data.split('\r\n');
        var arr = [];
                
        var start = false;
        for(let line of data) {
            if(start) {
                var i = line.indexOf(' ');
                arr.push(line.substr(0,i)+','+line.substr(i+1).trim());
            }
            else if(line === '') start = true;
        }
        return arr.join('\r\n');
    };
    
    return {
        parseToJson: parseToJson,
        parseToCsv: parseToCsv
    };
}();