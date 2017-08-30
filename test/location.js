var expect = require("chai").expect;
var loc = require("../location.js");

var dummy = 'First line ignored\r\n'
                +'Start after blank line\r\n'
                +'\r\n'
                +'AB   AAAABBBB\r\n'
                +'CD  CCCCDDDD\r\n'
                +'EFG       EEEEFFFFGGGG';
                
var wrap = new loc.DataWrapper(dummy);

describe("Model layer", function() {
  describe("DataWrapper", function() {
    it("Data is array", function() {
        expect(wrap.data instanceof Array).to.equal(true);
        expect(wrap.data.length).to.equal(3);
    });
    it("Data array contains Location objects", function() {
        expect(wrap.data[0].constructor).to.equal(loc.Location);
    });
    it("Parses Location objects correctly", function() {
        expect(wrap.data[1].name).to.equal('CCCCDDDD');
        expect(wrap.data[2].code).to.equal('EFG');
    });
    it("Parses to CSV string correctly", function() {
        var str = wrap.parseToCsvString();
        
        expect(typeof str).to.equal('string');
        expect(str.split('\r\n').length).to.equal(wrap.data.length);
    });
  });
});