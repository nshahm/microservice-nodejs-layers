/// <reference path="../../typings/main.d.ts" />

const dbURI    = 'mongodb://localhost/employees';
const expect   = require('chai').expect;
import mongoose = require('mongoose');
const clearDB  = require('mocha-mongoose')(dbURI);
import {EmployeeModel, IEmployeeModel} from "entity-employee";
 
describe("Example spec for a model", function() {
  
  beforeEach(function(done) {
    
      if (mongoose.connection.db) {
        return done();
      }
      mongoose.connect(dbURI, done);
  });
  
  const payload = {
      "employeeID": "1000002",
      "name": {
          "first": "John William",
          "last": "Patrick"
      },
      "address": {
          "lines": [
              "1234 Delk RD SW"
          ],
          "city": "Atlanta",
          "state": "GA",
          "zip": 12345
      }
  };
  
  var employee: IEmployeeModel = <IEmployeeModel>payload;
 
  it("can be saved", function(done) {    
    new EmployeeModel(employee).save(done);
  });
  
  it("can be listed", function(done) {
    
    new EmployeeModel(employee).save(function(err, model){
      
        expect(err).to.not.exist;
        
        EmployeeModel.find({}, function(err, docs){
          
            expect(err).to.not.exist;
            expect(docs).to.have.length(1);
            done();
        });
    });
  });  
});