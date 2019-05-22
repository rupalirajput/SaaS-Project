import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {ITestModel} from '../interfaces/ITestModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;
class TestModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
              testDate : Number,
              questionBankCreatorID : Number,
              testTakeerID : Number,
              questionBankID : Number,
              questionID : Number,
              orderOfQuestionInTest : Number,
              category : String,
              // isCorrect will be 0 incorrect, 1 will be correct
              isCorrect : Number,
            }, {collection: 'test'}
        );
    }
    public createModel(): void {
        this.model = mongooseConnection.model<ITestModel>("Test", this.schema);
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
    public retrieveOneTest(response:any, id: Number) {
        var query = this.model.find({testID: id});
        query.exec( (err, itemArray) => {
            if (!err) {
                response.json(itemArray);
            } else {
                console.log(err);
            };
        });
    }
}
export {TestModel};
