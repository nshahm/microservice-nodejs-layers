/// <reference path="../typings/main.d.ts" />

import * as Mongoose from "mongoose";
import * as Config from "config";

class MongoDB {
    
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
    
    
    static initialize (): Mongoose.Connection {
        
        const dbConfig: any = Config.get("mongodb");
        const options:any = {
            server: {
                poolSize: dbConfig.poolSize
            },
            user: "",
            pass: ""
        }
        const mongodbUrl = "mongodb://" + dbConfig.host + ":" + dbConfig.port + "/" + dbConfig.dbName;
        
        if(this.mongooseInstance) {
            return this.mongooseInstance;
        }
        
        this.mongooseConnection = Mongoose.connection;
        
        /** CONNECTION EVENTS */
        /** When successfully connected */
        this.mongooseConnection.on('connected', function() {
            console.log('Mongoose connection open');
        });

        /** If the connection throws an error */
        this.mongooseConnection.on('error', function(err) {
            console.log('Mongoose default connection error: ' + err);
        });

        /** When the connection is disconnected */
        this.mongooseConnection.on('disconnected', function() {
            console.log('Mongoose default connection disconnected');
        });

        /** If the Node process ends, close the Mongoose connection */
        process.on('SIGINT', function() {
            Mongoose.connection.close(function() {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
        
        this.mongooseInstance = Mongoose.connect(mongodbUrl, options);
        return this.mongooseInstance;
    }
    
}

MongoDB.initialize();
export default MongoDB;