import Mongoose = require("mongoose");

interface IReportModel {
    userId: String;
    quesBankID: Number;
    score: Number;
    strengths: String;
    weaknesses: String;
}

export {IReportModel};