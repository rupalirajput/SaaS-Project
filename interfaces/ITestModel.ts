import Mongoose = require("mongoose");

interface ITestModel extends Mongoose.Document {
  testID : Number;
  questionBankCreatorID : Number;
  testTakeerID : Number;
  questionBankID : Number;
  questionID : Number;
  orderOfQuestionInTest : Number;
  category : String;
  // isCorrect will be 0 incorrect, 1 will be correct
  isCorrect : Number;
}
export {ITestModel};
