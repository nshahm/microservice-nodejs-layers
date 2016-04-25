/// <reference path="../../typings/main.d.ts" />

var dbURI = 'mongodb://localhost/employees';
var expect = require('chai').expect;
var mongoose = require('mongoose');
var Dummy = mongoose.model('Dummy', new mongoose.Schema({ a: Number }));
var clearDB = require('mocha-mongoose')(dbURI);
import {EmployeeModel, IEmployeeModel} from "entity-employee";

describe("Example spec for a model", function () {

    beforeEach(function (done) {

        if (mongoose.connection.db) {
            return done();
        }
        mongoose.connect(dbURI, done);
    });

    const payload = {
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

    var employee: IEmployeeModel = <IEmployeeModel>payload;

    it("can be saved Employee", function (done) {
        new EmployeeModel(employee).save(done);
    });

    it("can be listed Employees", function (done) {


        new EmployeeModel(employee).save(function (err, model) {

            expect(err).to.not.exist;
            EmployeeModel.find({}, function (err, docs) {

                expect(err).to.not.exist;
                expect(docs).to.have.length(1);
                done();
            });
        });
    });

    it("can be findById", function (done) {

        new EmployeeModel(employee).save(function (err, model: any) {
            EmployeeModel.findById(model._id, function (err, docs) {

                expect(err).to.not.exist;
                //expect(docs).to.exist
                expect(docs).to.not.equal('bar');
                done();
            });
        });
    });

    it("can be updated", function (done) {

        new EmployeeModel(employee).save(function (err, model: any) {

            EmployeeModel.findById(model._id, function (err, docs: any) {

                expect(err).to.not.exist;
                docs.name.first = "John William"
                EmployeeModel.update(docs._id, docs, function (err, result) {
                    expect(err).to.not.exist;
                    expect(docs).to.have.length(1);
                });
                done();
            });
        });
    });

});