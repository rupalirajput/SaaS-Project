import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import { IReportModel } from "../interfaces/IReportModel";

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
                userId: String,
                quesBankID: Number,
                score: Number,
                strengths: String,
                weaknesses: String
            }, 
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IReportModel>("Reports", this.schema);
    }

    public retrieveAllReportDetails(response:any, filter:Object) {
        
    }






}