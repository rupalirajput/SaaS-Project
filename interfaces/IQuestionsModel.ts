import Mongoose = require("mongoose");

interface IQuestionsModel extends Mongoose.Document {
  questionBankID: Number;
  questionBankName : String;
  questionID: Number;
  questionText: String;
  category: String;
  options: [String, String, String, String];
  answer: String;
}
export {IQuestionsModel};
