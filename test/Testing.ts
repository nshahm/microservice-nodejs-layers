import * as Mongoose from "mongoose";
import * as Mocha from "mocha";
import * as chai from "chai";
import * as Config from "config";
import * as Sinon from "sinon";
import "reflect-metadata";
import { kernel, getInstance} from "../src/inversify.config";
import { Mongodb } from "../src/helpers/Mongodb";

// const mongoose: Mongoose.Mongoose = new Mongoose.Mongoose();
// const mockgoose = require("mockgoose");

const expect: Chai.ExpectStatic = chai.expect;
// const assert: Chai.AssertStatic = chai.assert;
// const AssertionError: Chai.AssertionStatic = chai.AssertionError;

/**
 * Chai configuraitonn
 */
chai.config.includeStack = false;
// AssertError chai.assert

// To add chai plugins 
// chai.use(PLUGIN); // for now there is no plugins.


// sinon

let sinon: Sinon.SinonStatic = Sinon;
sinon.config = {
    useFakeTimers : false
};

/**
 * Mocha Configurationn
 */
let mochaSetupOptions = {
    ignoreLeaks : true,
    reporters : Mocha.reporters.Spec,
    ui : "bdd",
};

// Configurationn
const dbconfig: any = Config.get("mongodbtest");


const mocha: Mocha = new Mocha(mochaSetupOptions);

// mocha.setup(mochaSetupOptions);


const mongodb: Mongodb = new Mongodb(dbconfig);


export {
    expect,
    mocha,
    sinon,
    kernel,
    getInstance,
    Mongoose,
    dbconfig,
    mongodb
};
