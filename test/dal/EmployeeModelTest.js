/// <reference path="../../typings/main.d.ts" />
"use strict";
var dbURI = 'mongodb://localhost/employees';
var expect = require('chai').expect;
var mongoose = require('mongoose');
var Dummy = mongoose.model('Dummy', new mongoose.Schema({ a: Number }));
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
            "first": "John",
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
    it("can be saved Employee", function (done) {
        new entity_employee_1.EmployeeModel(employee).save(done);
    });
    it("can be listed Employees", function (done) {
        new entity_employee_1.EmployeeModel(employee).save(function (err, model) {
            expect(err).to.not.exist;
            entity_employee_1.EmployeeModel.find({}, function (err, docs) {
                expect(err).to.not.exist;
                expect(docs).to.have.length(1);
                done();
            });
        });
    });
    it("can be findById", function (done) {
        new entity_employee_1.EmployeeModel(employee).save(function (err, model) {
            entity_employee_1.EmployeeModel.findById(model._id, function (err, docs) {
                expect(err).to.not.exist;
                //expect(docs).to.exist
                expect(docs).to.not.equal('bar');
                done();
            });
        });
    });
    it("can be updated", function (done) {
        new entity_employee_1.EmployeeModel(employee).save(function (err, model) {
            entity_employee_1.EmployeeModel.findById(model._id, function (err, docs) {
                expect(err).to.not.exist;
                docs.name.first = "John William";
                entity_employee_1.EmployeeModel.update(docs._id, docs, function (err, result) {
                    expect(err).to.not.exist;
                    expect(docs).to.have.length(1);
                });
                done();
            });
        });
    });
});
