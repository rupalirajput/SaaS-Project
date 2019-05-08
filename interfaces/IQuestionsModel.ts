import Mongoose = require("mongoose");

interface IQuestionsModel extends Mongoose.Document {
    quesBankID: Number;
    questions: [
          {
                quesid : Number;
                questiontext : String;
                description : String;
                options:[{opt1:String,opt2:String}];
                answer: String;

          }
        ]
}
export {IQuestionsModel};