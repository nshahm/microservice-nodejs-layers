import  {
    expect,
    sinon,
    getInstance,
    mongodb,
 } from "../config/Testing";
import * as supertest from "supertest";

import {IEmployeeModel} from "entity-employee";
import { IEmployeeDAO } from  "../../src/dal/dao/IEmployeeDAO";
import { app } from "../config/app";

describe("Employee API and service spec", function () {

   let request: supertest.SuperTest;

   // Create payload
   const payload: IEmployeeModel = <IEmployeeModel> {
       "entityVersion": "0.0.1",
        "employeeID": "1000002",
        "name": {
            "first": "Richard",
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

    // let employeeDAO: IEmployeeDAO<IEmployeeModel>;
   let employeeDAOMock: Sinon.SinonMock;
    let employeeDAO: IEmployeeDAO<IEmployeeModel>;

    /**
     * Before all testcase
     */
    before ((done) => {

    // Creating monggose connection 
     //  mongodb.connect();

    //    Initializing the request
       request = supertest(app);

       done();
    });

    /**
     * After all test case.
     */
    after((done) => {
      // mongodb.disconnect();
       done();
    });

    /**
     * Before every test case
     */
    beforeEach((done) => {
        employeeDAO = getInstance <IEmployeeDAO<IEmployeeModel>>("IEmployeeDAO");
        employeeDAOMock = sinon.mock(employeeDAO);
        done();
    });


    /**
     * After every testcase
     */
    afterEach((done) => {
         employeeDAOMock.restore();
        done();
    });

    /**
     * Create Employee
     */
    it("POST - create employee - /employee", (done) => {

        employeeDAOMock
            .expects("create")
            .withArgs(payload)
            .yields(null, {
                "status": "Success",
                "message": "Created successfully",
                });

        request
            .post("/v1/employee")
            .send(payload)
            .expect(200)    // request.expect, is status code 200?
            .expect("Content-Type", /json/)    // request.expect, does content-type match regex /json/?
            .expect((res) => {  // request.expect, does this user-provided function throw?
                // user-provided function can include Chai assertions
                expect(res.body).to.exist;
                expect(res.body).to.have.property("status");
                expect(res.body.status).to.equals("Success");
            }).
            end(done);
    });

    /**
     * GET Employee by Id
     */
    it("GET - fetch employee - /employee/id", (done) => {

        employeeDAOMock
            .expects("findById")
            .withArgs("id")
            .yields(null, { message: [  {"response": "responsedata"} ], status : "Success"});

        request
            .get("/v1/employee/id")
            .send({id: "data"})
            .expect(200)    // request.expect, is status code 200?
            .expect("Content-Type", /json/)    // request.expect, does content-type match regex /json/?
            .expect((res) => {  // request.expect, does this user-provided function throw?
                // user-provided function can include Chai assertions
                expect(res.body).to.exist;
                expect(res.body).to.have.property("status");
                expect(res.body.status).to.equals("Success");
                expect(res.body.message).to.exist;
            }).
            end(done);
    });

    /**
     * GET Employee by Id
     */
    it("GET - Retrieve all employee - /employee/", (done) => {

        employeeDAOMock
            .expects("retrieve")
            .yields(null, { message: [  {"response": "responsedata"} ], status : "Success"});

        request
            .get("/v1/employee")
            .expect(200)    // request.expect, is status code 200?
            .expect("Content-Type", /json/)    // request.expect, does content-type match regex /json/?
            .expect((res) => {  // request.expect, does this user-provided function throw?
                // user-provided function can include Chai assertions
                expect(res.body).to.exist;
                expect(res.body).to.have.property("status");
                expect(res.body.status).to.equals("Success");
                expect(res.body.message).to.exist;
            }).
            end(done);
    });

    /**
     * Update Employee
     */
    it("PUT - Update employee - /employee", (done) => {
        done();
        // employeeDAOMock
        //     .expects("findById")
        //     .withArgs("id")
        //     .yields(null, { "data": { _id: "57325119da8a8f5c299edb31"} , status : "Success"});

        // employeeDAOMock
        //     .expects("update")
        //     .withArgs("id", updatePayload)
        //     .yields(null, {
        //             "status": "Success",
        //             "message": "Updated successfully",
        //             });

        // request
        //     .put("/v1/employee/id")
        //      .set("id", "57325119da8a8f5c299edb31")
        //     .send(updatePayload)
        //     .expect(200)    // request.expect, is status code 200?
        //     .expect("Content-Type", /json/)    // request.expect, does content-type match regex /json/?
        //     .expect((res) => {  // request.expect, does this user-provided function throw?
        //         // user-provided function can include Chai assertions
        //         expect(res.body).to.exist;
        //         expect(res.body).to.have.property("status");
        //         expect(res.body.status).to.equals("Success");
        //     }).
        //     end(done);
    });

    /**
     * Delete Employee
     */
    it("DELETE - delete employee - /employee", (done) => {

        employeeDAOMock
            .expects("delete")
            .withArgs("id")
            .yields(null, {
                "status": "Success",
                "message": "Deleted successfully",
                });

        request
            .delete("/v1/employee/id")
             .set("id", "57325119da8a8f5c299edb31")
            .send(updatePayload)
            .expect(200)    // request.expect, is status code 200?
            .expect("Content-Type", /json/)    // request.expect, does content-type match regex /json/?
            .expect((res) => {  // request.expect, does this user-provided function throw?
                // user-provided function can include Chai assertions
                expect(res.body).to.exist;
                expect(res.body).to.have.property("status");
                expect(res.body.status).to.equals("Success");
            }).
            end(done);
    });
});
