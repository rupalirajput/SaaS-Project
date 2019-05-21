import Mongoose = require("mongoose");

interface IQuestionsModel extends Mongoose.Document {
  questionBankID: Number;
  questionID: Number;
  questionText: String;
  category: String;
  options: [String, String, String, String];
  answer: String;
}
export {IQuestionsModel};
