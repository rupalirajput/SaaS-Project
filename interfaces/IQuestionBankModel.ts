import Mongoose = require("mongoose");

interface IQuestionBankModel extends Mongoose.Document {
    questionBankID: Number;
    questionBankName: String;
    duration: Number,
    numberOfQuestions: Number,
    keyConcepts: String,
    status: String;
    createdDate: Date;
    lastmodifiedDate: Date;
    createdBy: String;
    updatedBy: String;
	description: String;
    noOfQues: Number;
    duration: Number;
}
export {IQuestionBankModel};
