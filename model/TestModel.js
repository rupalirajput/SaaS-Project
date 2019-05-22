"use strict";
exports.__esModule = true;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var TestModel = /** @class */ (function () {
    function TestModel() {
        this.createSchema();
        this.createModel();
    }
    TestModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            testDate: Number,
            questionBankCreatorID: Number,
            testTakeerID: Number,
            questionBankID: Number,
            questionID: Number,
            orderOfQuestionInTest: Number,
            category: String,
            // isCorrect will be 0 incorrect, 1 will be correct
            isCorrect: Number
        }, { collection: 'test' });
    };
    TestModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Test", this.schema);
    };
    // Gets all tests
    TestModel.prototype.retrieveAllTests = function (response) {
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
    // Gets all test records with one TestID
    TestModel.prototype.retrieveOneTest = function (response, id) {
        var query = this.model.find({ testID: id });
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
    return TestModel;
}());
exports.TestModel = TestModel;
