import * as Mangoose from "mongoose";
import * as config  from "config";

//var config = require(__dirname + '/Config');
//var logger = require(__dirname + '/Logger');

let dbConfig:any = config.get("employee.dbConfig");


const options:any = {

    server: {
        poolSize: dbConfig.poolSize
    }
    //user: dbConfig.username,
    //pass: dbConfig.password
};

let initializeMongoDB = () => {
    
    const mongodbUrl = "mongodb://" + dbConfig.host + ":" + dbConfig.port + "/" + dbConfig.dbName;
    Mangoose.connect(mongodbUrl, options);
    console.log(mongodbUrl);
    console.log(Mangoose);

    /** CONNECTION EVENTS */
    /** When successfully connected */
    Mangoose.connection.on('connected', function() {
        //logger.debug('Mongoose connection open');
        console.log('Mongoose connection open');
    });

    /** If the connection throws an error */
    Mangoose.connection.on('error', function(err) {
        //logger.error('Mongoose default connection error: ' + err);
        console.log('Mongoose default connection error: ' + err);
    });

    /** When the connection is disconnected */
    Mangoose.connection.on('disconnected', function() {
        //logger.debug('Mongoose default connection disconnected');
        console.log('Mongoose default connection disconnected');
    });

    /** If the Node process ends, close the Mongoose connection */
    process.on('SIGINT', function() {
        Mangoose.connection.close(function() {
            //logger.debug('Mongoose default connection disconnected through app termination');
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}

export default initializeMongoDB;

