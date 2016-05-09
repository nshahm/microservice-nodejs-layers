import * as Mongoose from "mongoose";

// const dbConfig: any = Config.get("mongodb");
// const options: any = {
//     pass: "",
//     server: {
//         poolSize: dbConfig.poolSize,
//     },
//     user: "",
// };

export class Mongodb {
    public config: any;

    public initialize(config: any) {
        this.connect();
    }

    /**
     * Mongodb connection
     */
    public connect() {

        Mongoose.connect(this.dburl, this.options);

        /** CONNECTION EVENTS */
        /** When successfully connected */
        Mongoose.connection.on("connected", function() {
            console.log("Mongoose connection open");
        });

        /** If the connection throws an error */
        Mongoose.connection.on("error", function(err) {
            console.log("Mongoose default connection error: " + err);
        });
    }
    /**
     * Mongodb disconnect
     */
    public disconnect(): void {

        /** When the connection is disconnected */
        Mongoose.connection.on("disconnected", function() {
            console.log("Mongoose default connection disconnected");
        });
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


/** If the Node process ends, close the Mongoose connection */
process.on("SIGINT", function() {
    Mongoose.connection.close(function() {
        console.log("Mongoose default connection disconnected through app termination");
        process.exit(0);
    });
});
