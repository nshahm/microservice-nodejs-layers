/// <reference path="../typings/main.d.ts" />

import * as Mocha from "mocha";
import * as chai from "chai";
import * as Sinon from "sinon";

// export class BaseTest {
    
    //  const expect:(chai.except);
   // const mocha:Mocha = mocha;
    
    // constructor() {
        
    /**
     * Chai configuraitonn
     */
    // Config chai - show trace
    chai.config.includeStack = true;

    // To add chai plugins 
    //chai.use(PLUGIN); // for now there is no plugins.

    /**
     * Mocha Configurationn
     */
    let mochaSetupOptions = {
        ui : 'tdd',
        ignoreLeaks :true,
        reporters : Mocha.reporters.List
    };
    mocha.setup(mochaSetupOptions);

    // }
   
    
// }

 export default  chai.expect;
 //exports.chai = chai;
 //exports.sinon = Sinon;
 //exports.mocha = mocha;