"use strict";
exports.__esModule = true;
var Mongoose = require("mongoose");
var DataAccess = /** @class */ (function () {
    function DataAccess() {
        this.mongoUrl = 'mongodb://dbAdmin:test@localhost:27017/QuizAppSample?authSource=admin';
        this.mongoSetup();
    }
    DataAccess.prototype.mongoSetup = function () {
        Mongoose.Promise = global.Promise;
        Mongoose.connect(this.mongoUrl);
    };
    DataAccess.connect = function () {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.on("open", function () {
            console.log("Connected to mongodb.");
        });
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    };
    DataAccess.DB_CONNECTION_STRING = 'mongodb://dbAdmin:test@localhost:27017/QuizAppSample?authSource=admin';
    return DataAccess;
}());
exports.DataAccess = DataAccess;
DataAccess.connect();
