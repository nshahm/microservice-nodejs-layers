/// <reference path="../../typings/main.d.ts" />
"use strict";
var dbURI = 'mongodb://localhost/employees';
var expect = require('chai').expect;
var mongoose = require('mongoose');
var entity_employee_1 = require("entity-employee");
describe("Example spec for a model", function () {
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
    beforeEach(function (done) {
        if (mongoose.connection.db) {
            return done();
        }
        mongoose.connect(dbURI, done);
    });
    beforeEach(function (done) {
        //delete all the customer records    
        entity_employee_1.EmployeeModel.remove({}, function () {
            done();
        });
    });
    var employee = payload;
    it("can be saved .....", function (done) {
        entity_employee_1.EmployeeModel.create(employee, function (error) {
            expect(error).to.not.exist;
            done();
        });
    });
    it("can be listed .....", function (done) {
        entity_employee_1.EmployeeModel.create(employee, function (err, model) {
            expect(err).to.not.exist;
            entity_employee_1.EmployeeModel.find({}, function (err, docs) {
                expect(err).to.not.exist;
                expect(docs).to.be.an("array").with.length(1);
                done();
            });
        });
    });
    it("can be find by ID .....", function (done) {
        entity_employee_1.EmployeeModel.create(employee, function (err, model) {
            entity_employee_1.EmployeeModel.findOne({ _id: model._id }, function (err, docs) {
                expect(err).to.not.exist;
                expect(docs.name.first).to.equal("John");
                done();
            });
        });
    });
    it("can be updated .....", function (done) {
        entity_employee_1.EmployeeModel.create(employee, function (err, model) {
            entity_employee_1.EmployeeModel.findById(model._id, function (err, docs) {
                expect(err).to.not.exist;
                docs.name.first = "John William";
                var _id = docs._id;
                entity_employee_1.EmployeeModel.update({ _id: _id }, docs, function (err, doc) {
                    expect(err).to.not.exist;
                    expect(doc.ok).to.equal(1);
                });
                done();
            });
        });
    });
    it("can be deleted .....", function (done) {
        entity_employee_1.EmployeeModel.create(employee, function (err, model) {
            entity_employee_1.EmployeeModel.findById(model._id, function (err, docs) {
                expect(err).to.not.exist;
                entity_employee_1.EmployeeModel.remove({ _id: docs._id }, function (err) {
                    expect(err).to.not.exist;
                });
                done();
            });
        });
    });
});
