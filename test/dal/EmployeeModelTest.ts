/// <reference path="../../typings/main.d.ts" />

var dbURI = 'mongodb://localhost/employees';
import {expect, Mocha, Sinon} from "../config/Testing"

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

    /**
     * Clear all the data in collection for test purpose
     * Comment out this beforeEach() block if the data not to be cleared.
     */
    beforeEach(function (done) {
        //delete all the customer records    
        EmployeeModel.remove({}, function () {
            done();
        });
    });



    var employee: IEmployeeModel = <IEmployeeModel>payload;

    it("create", function (done) {
        EmployeeModel.create(employee, function(error) {
            expect(error).to.not.exist;
            done();
        });
    });

    it("find", function (done) {

        EmployeeModel.create(employee, function (err, model) {

            expect(err).to.not.exist;
            EmployeeModel.find({}, function (err, docs: any) {

                expect(err).to.not.exist;
                expect(docs).to.be.an("array").with.length(1);
                done();
            });
        });
    });

    it("findById", function (done) {

        EmployeeModel.create(employee, function (err, model: any) {
            EmployeeModel.findById(model._id, function (err, docs) {

                expect(err).to.not.exist;
                expect(docs.name.first).to.equal("John");
                done();
            });
        });
    });

    it("update", function (done) {

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

    // it("delete", function (done) {

    //     EmployeeModel.create(employee, function (error, model: any) {
    //         expect(error).to.not.exist;
    //         EmployeeModel.findById(model._id, function (error, docs: any) {

    //             expect(error).to.not.exist;
    //             EmployeeModel.remove({ _id: docs._id }, function (error) {
    //                 expect(error).to.not.exist;
    //             });
    //             done();
    //         });
    //     });
    // });
    
    // it("findOne", function (done) {

    //     EmployeeModel.create(employee, function (err, model: any) {
    //         var employeeID = model.employeeID;
    //         EmployeeModel.findOne({ employeeID: model.employeeID }, function (err, docs) {

    //             expect(err).to.not.exist;
    //             expect(docs.employeeID).to.equal(employeeID);
    //             done();
    //         });
    //     });
    // });

});