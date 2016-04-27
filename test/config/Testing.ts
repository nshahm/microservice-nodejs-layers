///// <reference path="../../typings/main.d.ts" />

import * as Mocha from "mocha";
import * as chai from "chai";
import * as Sinon from "sinon";


    
var expect:Chai.ExpectStatic = chai.expect;

/**
 * Chai configuraitonn
 */
chai.config.includeStack = true;

// To add chai plugins 
//chai.use(PLUGIN); // for now there is no plugins.


/**
 * Mocha Configurationn
 */
let mochaSetupOptions = {
    //ignoreLeaks :true,
    reporters : Mocha.reporters.Spec
};


var mocha:Mocha = new Mocha(mochaSetupOptions);

//mocha.setup(mochaSetupOptions);

export { expect, Mocha, Sinon };
