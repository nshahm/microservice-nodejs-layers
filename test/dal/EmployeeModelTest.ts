/// <reference path="../../typings/main.d.ts" />

var dbURI = 'mongodb://localhost/employees';
var expect = require('chai').expect;
var mongoose = require('mongoose');
import {EmployeeModel, IEmployeeModel} from "entity-employee";

describe("Example spec for a model", function () {

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

    beforeEach(function (done) {

        if (mongoose.connection.db) {
            return done();
        }
        mongoose.connect(dbURI, done);
    });

    beforeEach(function (done) {
        //delete all the customer records    
        EmployeeModel.remove({}, function () {
            done();
        });
    });



    var employee: IEmployeeModel = <IEmployeeModel>payload;

    it("can be saved .....", function (done) {
        EmployeeModel.create(employee, function(error) {
            expect(error).to.not.exist;
            done();
        });
    });

    it("can be listed .....", function (done) {

        EmployeeModel.create(employee, function (err, model) {

            expect(err).to.not.exist;
            EmployeeModel.find({}, function (err, docs: any) {

                expect(err).to.not.exist;
                expect(docs).to.be.an("array").with.length(1);
                done();
            });
        });
    });

    it("can be find by ID .....", function (done) {

        EmployeeModel.create(employee, function (err, model: any) {
            EmployeeModel.findOne({ _id: model._id }, function (err, docs) {

                expect(err).to.not.exist;
                expect(docs.name.first).to.equal("John");
                done();
            });
        });
    });

    it("can be updated .....", function (done) {

        EmployeeModel.create(employee, function (err, model: any) {

            EmployeeModel.findById(model._id, function (err, docs: any) {

                expect(err).to.not.exist;
                docs.name.first = "John William"

                var _id = docs._id;
                EmployeeModel.update({ _id: _id }, docs, function (err, doc: any) {
                    expect(err).to.not.exist;
                    expect(doc.ok).to.equal(1);
                });
                done();
            });
        });
    });

    it("can be deleted .....", function (done) {

        EmployeeModel.create(employee, function (err, model: any) {
            EmployeeModel.findById(model._id, function (err, docs: any) {

                expect(err).to.not.exist;
                EmployeeModel.remove({ _id: docs._id }, function (err) {
                    expect(err).to.not.exist;
                });
                done();
            });
        });
    });

});