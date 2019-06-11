"use strict";
exports.__esModule = true;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var AccountModel = /** @class */ (function () {
    function AccountModel() {
        this.createSchema();
        this.createModel();
    }
    AccountModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            usernname: String,
            password: String,
            userid: Number,
            firstName: String,
            lastName: String,
            email: String,
            role: {
                type: String,
                "enum": ['student', 'professor']
            }
        }, { collection: 'accounts' });
    };
    AccountModel.prototype.createModel = function () {
        mongooseConnection.models = {};
        this.model = mongooseConnection.model("Accounts", this.schema);
    };
    // model = mongooseConnection.model('Accounts', this.schema);
    AccountModel.prototype.saveUser = function (data) {
        var myData = new this.model(data);
        myData.save()
            .then(function (item) {
            console.log("item saved to database");
        })["catch"](function (err) {
            console.log("unable to save to database");
        });
    };
    // Gets account given filter parameters
    AccountModel.prototype.retrieveAccountDetails = function (response, filter) {
        var query = this.model.find(filter);
        query.exec(function (err, itemArray) {
            if (!err) {
                response.json(itemArray);
            }
            else {
                console.log(err);
            }
            ;
        });
    };
    // Gets all accounts
    AccountModel.prototype.retrieveAllAcccounts = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            if (!err) {
                response.json(itemArray);
            }
            else {
                console.log(err);
            }
            ;
        });
    };
    return AccountModel;
}());
exports.AccountModel = AccountModel;
