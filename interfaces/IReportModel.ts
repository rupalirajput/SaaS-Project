import Mongoose = require("mongoose");

interface IReportModel{
    reportid: Number;
    userid: Number;
    quesBankID: Number;
    score: Number;
    strengths: String;
    weaknesses: String;
    categories: [];
    scores: [];
    title: String;
}

export {IReportModel};