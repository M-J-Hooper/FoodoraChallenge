//model layer for object-orienting the raw data from data layer

module.exports = function() {
    function Location(code, name) {
        this.code = code;
        this.name = name;
    }
    
    //data wrapper object whose constructor object-orients the raw data
    //data prop is an array of Location objects
    function DataWrapper(rawData) {
        var arr = rawData.split('\r\n');
        this.data = [];
        
        var start = false;
        for(let line of arr) {
            if(start) {
                var i = line.indexOf(' ');
                if(i > 0) {
                    var cells = [line.substr(0,i), line.substr(i+1).trim()];
                    var loc = new Location(cells[0], cells[1]);
                    this.data.push(loc);
                }
            }
            else if(line === '') start = true;
        }
        return this;
    }
    
    //method of wrapper for parsing to csv formatted string
    DataWrapper.prototype.parseToCsvString = function() {
        var str = '';                
        var start = false;
        for(let loc of this.data) {
            str += '"' + loc.code + '","' + loc.name + '"\r\n';
        }
        return str;
    };
    
    //export wrapper contructor for use in data layer
    return {
        DataWrapper: DataWrapper
    };
}();