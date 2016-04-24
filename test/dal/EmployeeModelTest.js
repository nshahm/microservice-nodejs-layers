/// <reference path="../../typings/main.d.ts" />
"use strict";
var dbURI = 'mongodb://localhost/employees';
var expect = require('chai').expect;
var mongoose = require('mongoose');
var clearDB = require('mocha-mongoose')(dbURI);
var entity_employee_1 = require("entity-employee");
describe("Example spec for a model", function () {
    beforeEach(function (done) {
        if (mongoose.connection.db) {
            return done();
        }
        mongoose.connect(dbURI, done);
    });
    var payload = {
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
    var employee = payload;
    it("can be saved", function (done) {
        new entity_employee_1.EmployeeModel(employee).save(done);
    });
    it("can be listed", function (done) {
        new entity_employee_1.EmployeeModel(employee).save(function (err, model) {
            expect(err).to.not.exist;
            entity_employee_1.EmployeeModel.find({}, function (err, docs) {
                expect(err).to.not.exist;
                expect(docs).to.have.length(1);
                done();
            });
        });
    });
});
