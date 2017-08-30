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
        
        var start = false; //only start processing lines when passed marker
        for(let line of arr) {
            if(start) {
                var i = line.indexOf(' ');
                if(i > 0) { //only include 
                    var cells = [line.substr(0,i), line.substr(i+1).trim()];
                    var loc = new Location(cells[0], cells[1]);
                    this.data.push(loc);
                }
            }
            else if(line === '') start = true; //for this data the marker is an empty line
        }
        return this;
    }
    
    //method of wrapper for parsing to csv formatted string
    DataWrapper.prototype.parseToCsvString = function() {
        var arr = [];                
        var start = false;
        for(let loc of this.data) {
            arr.push('"' + loc.code + '","' + loc.name + '"');
        }
        return arr.join('\r\n');
    };
    
    //export wrapper contructor for use in data layer
    return {
        DataWrapper: DataWrapper,
        Location: Location
    };
}();