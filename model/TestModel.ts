import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {ITestModel} from '../interfaces/ITestModel';
import {IQuestionsModel} from '../interfaces/IQuestionsModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;
class TestModel {
    public schema:any;
    public model:any;
    public questionSchema:any;
    public questionModel:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
              testID : Number,
              questionBankCreatorID : Number,
              testTakerID : Number,
              questionBankID : Number,
              questionID : Number,
              orderOfQuestionInTest : Number,
              category : String,
              // isCorrect will be 0 incorrect, 1 will be correct
              isCorrect : Number,
            }, {collection: 'test'}
        );

      this.questionSchema = new Mongoose.Schema(
        {
          questionBankID: Number,
          questionID: Number,
          questionText: String,
          category: String,
          options: [String, String, String, String],
          answer: String,
        }, {collection: 'questions'}
      );
    }
    public createModel(): void {
        this.model = mongooseConnection.model<ITestModel>("Test", this.schema);
        this.questionModel = mongooseConnection.model<IQuestionsModel>("Question", this.questionSchema);
    }

    // Gets all tests
    public retrieveAllTests(response:any): any {
      var query = this.model.find({});
      query.exec( (err, itemArray) => {
        if (!err) {
          response.json(itemArray);
        } else {
          console.log(err);
        };
      });
    }

    // Gets all test records with one TestID
    public retrieveOneTest(response:any, filter:Object) {
      var query = this.model.find(filter);
      query.exec( (err, itemArray) => {
          if (!err) {
              response.json(itemArray);
          } else {
              console.log(err);
          };
      });
    }

    // Gets random question as the first question on a test
    public retrieveRandomQuestion(response:any, id: any) {
      var query = this.questionModel.find({questionBankID: Number(id)}).sort({questionID: 'desc'});
      query.exec( (err, itemArray) => {
          if (!err) {
            let randomQuestionNumber = Math.floor((Math.random() * itemArray.length));
            console.log(itemArray);
            response.json(itemArray[randomQuestionNumber]);
          } else {
            console.log(err);
          };
      });
    }

    // Gets question questions 2 -> end of test
    public retrieveNextQuestion(response: any, id: any, testID: any){
      
    }

    // Gets test results to be used in reports
    public getSingleReportInfo(response:any, testTakerID:Number,
      questionBankID:Number ) {
      console.log('getting single report info');
      var query = this.model.findOne({testTakerID: testTakerID,
      questionBankID:questionBankID}).sort('-testID');
      var newestTestID;

      query.exec( (err, itemArray) => {
        if (!err) {
          console.log('entered query');
          newestTestID = itemArray.testID;
            
          var query2 = this.model.find({testID: newestTestID,
          testTakerID: testTakerID,
          questionBankID:questionBankID});
          
          query2.exec((err, itemArray) => {
            if (!err) {
              response.json(itemArray);
<<<<<<< HEAD
            }
            else {
              console.log(err);
            };
          });
        } else {
          console.log('error in express');  
          console.log(err);
=======
>>>>>>> 4daee6294e702f62f95d4972b538b4c8284e2d89
          };
      }); 
    }
    // Posts a record in Test collection given testID and questionID
    // Is called when user submits and answer to a question
    // Will contain data:
    /*
    testID : Number
		questionBankCreatorID : Number
		testTakerID : Number
		questionBankID : Number
		questionID : Number
	 	orderOfQuestionInTest : Number
		category : String
		isCorrect : Number
    public submitAnswer(response: any, filter: Object) {

  }
    */
}
export {TestModel};
