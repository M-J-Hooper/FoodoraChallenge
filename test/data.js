var expect = require("chai").expect;
var data = require("../data.js");
var loc = require("../location.js");

var url = 'http://pastebin.com/raw/943PQQ0n';

describe("Data access layer", function() {
  describe("getData", function() {
    it("Returns DataWrapper object", function() {
        return data.getData(url).then(function(wrap) {
           expect(wrap.constructor).to.equal(loc.DataWrapper);
        });
    });
    it("Data is correct", function() {
        return data.getData(url).then(function(wrap) {
           expect(wrap.data.length).to.equal(252);
           expect(wrap.data[0].name).to.equal('Andorra');
           expect(wrap.data[251].code).to.equal('NATO');
        });
    });
  });
  
  describe("getJsonData", function() {
    it("Returns json", function() {
        return data.getJsonData(url).then(function(data) {
           expect(typeof data).to.equal('object');
        });
    });
  });
  describe("getCsvData", function() {
    it("Returns string", function() {
        return data.getCsvData(url).then(function(data) {
           expect(typeof data).to.equal('string');
        });
    });
    it("String is CSV formatted", function() {
        return data.getCsvData(url).then(function(data) {
           expect(data.split('\r\n').length).to.be.above(1);
           expect(data.split(',').length).to.be.above(1);
        });
    });
  });
});