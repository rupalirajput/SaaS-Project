"use strict";
exports.__esModule = true;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var ReportModel = /** @class */ (function () {
    function ReportModel() {
        this.createSchema();
        this.createModel();
    }
    ReportModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            reportid: Number,
            userid: Number,
            questionBankID: Number,
            score: Number,
            strengths: String,
            weaknesses: String,
            categories: [],
            scores: [],
            title: String
        });
    };
    ReportModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Reports", this.schema);
    };
    // Gets account given filter parameters
    ReportModel.prototype.retrieveSingleReportDetails = function (response, filter) {
        var query = this.model.find(filter);
        query.exec(function (err, itemArray) {
            if (!err) {
                response.json(itemArray);
            }
            else {
                console.log(err);
            }
            ;
        });
    };
    ReportModel.prototype.retrieveAllReportDetails = function (response, filter) {
        var query = this.model.find(filter);
        query.exec(function (err, itemArray) {
            if (!err) {
                response.json(itemArray);
            }
            else {
                console.log(err);
            }
            ;
        });
    };
    return ReportModel;
}());
exports.ReportModel = ReportModel;
