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
            testID: Number,
            questionBankCreatorID: Number,
            testTakerID: Number,
            questionBankID: Number,
            questionID: Number,
            orderOfQuestionInTest: Number,
            category: String,
            // isCorrect will be 0 incorrect, 1 will be correct
            isCorrect: Number
        }, { collection: 'test' });
        this.questionSchema = new Mongoose.Schema({
            questionBankID: Number,
            questionID: Number,
            questionText: String,
            category: String,
            options: [String, String, String, String],
            answer: String
        }, { collection: 'questions' });
    };
    TestModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Test", this.schema);
        this.questionModel = mongooseConnection.model("Question", this.questionSchema);
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
    TestModel.prototype.retrieveOneTest = function (response, filter) {
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
    // Gets all test records with one TestID
    TestModel.prototype.retrieveRandomQuestion = function (response, id) {
        var query = this.questionModel.find({ questionBankID: Number(id) }).sort({ questionID: 'desc' });
        console.log(typeof (id));
        query.exec(function (err, itemArray) {
            if (!err) {
                var randomQuestionNumber = Math.floor((Math.random() * itemArray.length));
                console.log(itemArray);
                response.json(itemArray[randomQuestionNumber]);
            }
            else {
                console.log(err);
            }
            ;
        });
    };
    // Gets test results to be used in reports
    TestModel.prototype.getSingleReportInfo = function (response, filter) {
        var query = this.model.find(filter);
        query.exec(function (err, itemArray) {
            if (!err) {
                response.json(itemArray);
                console.log('single report working');
            }
            else {
                console.log('error in express');
                console.log(err);
            }
            ;
        });
    };
    return TestModel;
}());
exports.TestModel = TestModel;
