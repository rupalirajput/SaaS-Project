import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IAccountModel} from '../interfaces/IAccountModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class AccountModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                usernname: String,
                password: String,
                firstName: String,
                lastName: String
            }, {collection: 'accounts'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IAccountModel>("Accounts", this.schema);
    }

    public retrieveAllAcccounts(response:any): any {
        var query = this.model.find({});
        query.exec( (err,itemArray) => {
            response.json(itemArray) ;
        });

    }
}
export {AccountModel};