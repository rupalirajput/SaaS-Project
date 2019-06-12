import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IQuestionBankModel} from '../interfaces/IQuestionBankModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class QuestionBankModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                questionBankID: Number,
                questionBankName: String,
                duration: Number,
                numberOfQuestions: Number,
                keyConcepts: String,
                status: String,
                createdDate: Date,
                lastmodifiedDate: Date,
                createdBy: String,
                updatedBy: String
            }, {collection: 'questionBanks'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IQuestionBankModel>("QuestionBanks", this.schema);
    }

    public retrieveAllQuestionBanks(response:any): any {
        var query = this.model.find({});
        query.exec( (err,itemArray) => {
            response.json(itemArray) ;
        });
    }


    public retrieveQuestionBankDetails(response:any, filter:Object) {
        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });

    }

    public deleteQuestionBank(response:any, filter:Object) {
        var query = this.model.findOneAndRemove(filter);
        query.exec( (err, itemArray) => {
        if (!err)
        {
          response.json(itemArray) ;
        }
        else
        {
          console.log(err);
        }
      });
    }

}
export {QuestionBankModel};
