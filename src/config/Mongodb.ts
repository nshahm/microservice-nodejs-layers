import * as Mongoose from "mongoose";
import {Logger } from "logger";
class Mongodb {
    public config: any;

    constructor(config: any) {
        this.config = config;
    }

    /**
     * Mongodb connection
     */
    public connect() {

        Mongoose.connect(this.dburl, this.options);

        /** CONNECTION EVENTS */
        /** When successfully connected */
        Mongoose.connection.on("connected", function() {
            Logger.info("Mongoose connection open");
        });

        /** If the connection throws an error */
        Mongoose.connection.on("error", function(err) {
            Logger.info("Mongoose default connection error: " + err);
        });
    }

    /**
     * Mongodb disconnect
     */
    public disconnect(): void {

        Mongoose.connection.close(function() {
             Logger.info("Mongoose connection disconnected");
            // process.exit(0);
        });

        /** When the connection is disconnected */
        Mongoose.connection.on("disconnected", function() {
            Logger.info("Mongoose default connection disconnected");
        });
    }

    public exit(): void {
        this.disconnect();
        process.exit(0);
    }

    /**
     * Mongo db options constructed in template 
     */
    get options() {
        return {
            pass: this.config.pass,
            server: {
                poolSize: this.config.poolSize,
            },
            user: this.config.user,
        };
    }

    get dburl(): string {
        return "mongodb://" + this.config.host + ":" + this.config.port + "/" + this.config.dbName;
    }
}

export { Mongodb };
