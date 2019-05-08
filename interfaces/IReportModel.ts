import Mongoose = require("mongoose");

interface IReportModel extends Mongoose.Document{
    reportid: Number;
    userid: Number;
    quesBankID: Number;
    score: Number;
    strengths: String;
    weaknesses: String;
}

export {IReportModel};