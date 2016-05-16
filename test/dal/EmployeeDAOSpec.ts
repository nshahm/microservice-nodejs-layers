import {expect, Mongoose, mongodb } from "../Testing";

import { getInstance } from "../../src/inversify.config";
import {IEmployeeModel} from "entity-employee";
import { IEmployeeDAO } from  "../../src/dal/dao/IEmployeeDAO";



describe("Employee Data Access layer Spec", function () {

   // To hold ObjectId
   let id: Mongoose.Types.ObjectId;

   // Create payload
   const payload: IEmployeeModel = <IEmployeeModel> {
        "entityVersion": "1.0.0",
        "employeeID": "1000002",
        "name": {
            "first": "John",
             "last": "Patrick",
        },
        "address": {
            "lines": [
                "1234 Delk RD SW",
            ],
            "city": "Atlanta",
            "state": "GA",
            "zip": 12345,
        },
    };

    // Update payload
    const updatePayload: IEmployeeModel = <IEmployeeModel>  {
        name : {
             first: "John William",
             last : "Patrick",
        },
    };

    let employeeDAO: IEmployeeDAO<IEmployeeModel>;
    let employeeID = "1000002";

    // Delete all document before starting the testcase
    before ((done) => {

       mongodb.connect(
        (error) => {
            console.log(error);
            },
        () => {
            // console.log("Connected");
             done();
        });
    });

    // Disconnect mongoose connection
    after((done) => {
       mongodb.disconnect();
        done();
    });

    /**
     * Before every test case
     */
    beforeEach((done) => {
        employeeDAO = getInstance <IEmployeeDAO<IEmployeeModel>>("IEmployeeDAO");
        done();
    });


    // /**
    //  * After every testcase
    //  */
    // afterEach((done) => {
    //     done();
    // });


    /**
     * Create Employee
     */
    it("create", (done) => {

        employeeDAO.create(payload, (error) => {
            if (error) {
                console.log(error);
            }
            expect(error).to.not.exist;
            done();
        });
    });

    /**
     * Retrieve Employee
     */
    it("retrieve",  (done) => {

        employeeDAO.retrieve((error, docs) => {
            if (error) {
                console.log(error);
            }

            id = docs[0]._id;
            expect(error).to.not.exist;
            expect(docs[0]._doc.employeeID).to.equal(payload.employeeID);
            done();
        });
    });

    /**
     * FindById Employee
     */
    it("findById", (done) => {

        employeeDAO.findById(employeeID,  (error, docs) => {
            if (error) {
                console.log(error);
            }
            expect(error).to.not.exist;
            expect(docs.name.first).to.equal("John");
            done();
        });
    });

    /**
     * Update Employee
     */
    it("update",  (done) => {

        employeeDAO.update( id.toHexString(), updatePayload,  (error, doc: any) => {
            if (error) {
                console.log(error);
            }
            expect(error).to.not.exist;
            expect(doc.ok).to.equal(1);
        });
        done();
    });

    /**
     * Delete Employee
     */
    it("delete",  (done) => {

        employeeDAO.delete(id.toHexString(),  (error) => {
            if (error) {
                console.log(error);
            }
            expect(error).to.not.exist;
        });
        done();
    });

});
