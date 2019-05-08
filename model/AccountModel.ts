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
        this.model = mongooseConnection.model<IAccountModel>("Account", this.schema);
    }

    public retrieveAllAcccounts(response:any): any {
        var PUser = Mongoose.model('accounts', this.schema);
        PUser.find({}).exec(function(err, result) {
            if (!err) {
               response.json(result) ;
            } else {
                console.log(err);
            };
        });


    }
}
export {AccountModel};