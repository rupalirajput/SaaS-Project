import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IQuestionsModel} from '../interfaces/IQuestionsModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class QuestionsModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
            quesBankID: Number,
            questions: [
                  {
                        quesid : Number,
                        questiontext : String,
                        description : String,
                        options:[{opt1:String,opt2:String}],
                        answer: String
        
                  }
                ]
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IQuestionsModel>("questions", this.schema);
    }

    public retrieveAllQuestions(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

    public retrieveQuestionsDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });

    }
    public deleteQuestion(response:any, filter:Object) {
        this.model.remove(filter);
        response.json(filter)
    } 
}
export {QuestionsModel};