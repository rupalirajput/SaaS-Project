import Mongoose = require("mongoose");

interface IReportModel extends Mongoose.Document{
    reportid: Number;
    userid: Number;
    questionBankID: Number;
    score: Number;
    strengths: String;
    weaknesses: String;
}

export {IReportModel};