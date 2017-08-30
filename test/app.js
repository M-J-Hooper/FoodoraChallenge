var expect = require("chai").expect;
var request = require("request-promise");

describe("Server layer", function() {
  describe("Get /api/show", function() {
    var url = "http://localhost:8080/api/show";
    
    it("Sends json response", function() {
        return request(url).then(function(data) {
           expect(typeof JSON.parse(data)).to.equal('object');
        });
    });
  });
  describe("Get /api/download", function() {
    var url = "http://localhost:8080/api/download";
      
    it("Sends string response", function() {
        return request(url).then(function(data) {
           expect(typeof data).to.equal('string');
        });
    });
    it("String is CSV formatted", function() {
        return request(url).then(function(data) {
           expect(data.split('\r\n').length).to.be.above(1);
           expect(data.split(',').length).to.be.above(1);
        });
    });
  });
});