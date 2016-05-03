import * as Mongoose from "mongoose";
import * as Config from "config";

const dbConfig: any = Config.get("mongodb");
const options: any = {
    pass: "",
    server: {
        poolSize: dbConfig.poolSize,
    },
    user: "",
};

const mongodbUrl = "mongodb://" + dbConfig.host + ":" + dbConfig.port + "/" + dbConfig.dbName;

Mongoose.connect(mongodbUrl, options);

/** CONNECTION EVENTS */
/** When successfully connected */
Mongoose.connection.on("connected", function() {
    console.log("Mongoose connection open");
});

/** If the connection throws an error */
Mongoose.connection.on("error", function(err) {
    console.log("Mongoose default connection error: " + err);
});

/** When the connection is disconnected */
Mongoose.connection.on("disconnected", function() {
    console.log("Mongoose default connection disconnected");
});

/** If the Node process ends, close the Mongoose connection */
process.on("SIGINT", function() {
    Mongoose.connection.close(function() {
        console.log("Mongoose default connection disconnected through app termination");
        process.exit(0);
    });
});
