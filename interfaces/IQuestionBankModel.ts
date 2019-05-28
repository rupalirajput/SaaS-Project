import Mongoose = require("mongoose");

interface IQuestionBankModel extends Mongoose.Document {
    quesBankID: Number;
    quesBankName: String;
    duration: Number,
    numberOfQuestions: Number,
    keyConcepts: String,
    status: String;
    createdDate: Date;
    lastmodifiedDate: Date;
    createdBy: String;
    updatedBy: String;
}
export {IQuestionBankModel};
