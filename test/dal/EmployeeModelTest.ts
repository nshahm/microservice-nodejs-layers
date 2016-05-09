/// <reference path="../../typings/main.d.ts" />

const dbURI = "mongodb://localhost/Testing";
import {expect } from "../config/Testing"

const mongoose = require("mongoose");
import {EmployeeModel, IEmployeeModel} from "entity-employee";

describe("Example spec for a model", function () {

   // To hold ObjectId
   let id: any;

   // Create payload
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

    // Update payload
    const updatePayload = {
        name : {
             first: "John William",
             last : "Patrick"
        },
    };

    // Delete all document before starting the testcase
    before ((done) => {

        // Create mongoose connection to mongodb
        if (mongoose.connection.db) {
            return done();
        }
        mongoose.connect(dbURI, done);

    });

    // Disconnect mongoose connection
    after((done) => {
       mongoose.disconnect();
       done();
    });

    const employee: IEmployeeModel = <IEmployeeModel> payload;

    /**
     * Create Employee
     */
    it("create", (done) => {
        EmployeeModel.create(employee, (error) => {
            expect(error).to.not.exist;

            done();
        });
    });

    /**
     * Find Employee
     */
    it("find", (done) => {

        EmployeeModel.find({}, (err, docs: any) => {
                id = docs[0]._id;
            expect(err).to.not.exist;
            expect(docs).to.be.an("array").with.length(1);
            done();
        });
    });

    /**
     * FindById Employee
     */
    it("findById", (done) => {

        EmployeeModel.findById(id,  (err, docs) => {

            expect(err).to.not.exist;
            expect(docs.name.first).to.equal("John");
            done();
        });
    });

    /**
     * Update Employee
     */
    it("update",  (done) => {

        EmployeeModel.update({ _id: id }, updatePayload,  (err, doc: any) => {
            expect(err).to.not.exist;
            expect(doc.ok).to.equal(1);
        });
        done();
    });

    /**
     * FindByOne Employee
     */
    it("findOne",  (done) => {

        EmployeeModel.findOne({ employeeID: payload.employeeID },  (err, docs) => {

            expect(err).to.not.exist;
            expect(docs.employeeID).to.equal(payload.employeeID);
            done();
        });
    });

    /**
     * Delete Employee
     */
    it("delete",  (done) => {

        EmployeeModel.remove({ _id: id },  (error) => {
            expect(error).to.not.exist;
        });
        done();
    });

});