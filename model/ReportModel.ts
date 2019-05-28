import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IReportModel} from "../interfaces/IReportModel";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class ReportModel {
    public schema: any;
    public model: any;

    public constructor(){
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
        {
                reportid: Number,
                userid: Number,
                questionBankID: Number,
                score: Number,
                strengths: String,
                weaknesses: String
            },
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IReportModel>("Reports", this.schema);
    }

    // Gets account given filter parameters
    public retrieveSingleReportDetails(response:any, filter:Object) {
        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
            if (!err) {
                response.json(itemArray);
            } else {
                console.log(err);
            };
        });
    }

    public retrieveAllReportDetails(response:any, filter:Object) {
        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
             if (!err) {
                response.json(itemArray);
            } else {
                console.log(err);
            };
        });
    }
}
export {ReportModel};