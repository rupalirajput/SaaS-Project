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
    // Gets random question as the first question on a test
    TestModel.prototype.retrieveRandomQuestion = function (response, id) {
        var query = this.questionModel.find({ questionBankID: Number(id) }).sort({ questionID: 'desc' });
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
    // Gets question questions 2 -> end of test
    TestModel.prototype.retrieveNextQuestion = function (response, id, order, testid) {
        var _this = this;
        var queryAnsweredQuestions = this.model.find({ testID: testid }).select('questionID');
        queryAnsweredQuestions.exec(function (err, resultArray) {
            if (!err) {
                var answeredQuestions = new Array();
                var i;
                for (i = 0; i < resultArray.length; i++) {
                    answeredQuestions.push(resultArray[i]['questionID']);
                }
                var queryAllQuestions = _this.questionModel.findOne({ questionBankID: id, questionID: { "$nin": answeredQuestions } });
                queryAllQuestions.exec(function (err, question) {
                    if (!err) {
                        console.log("Next question: ", question);
                        response.json(question);
                    }
                    else {
                        console.log(err);
                    }
                });
            }
            else {
                console.log(err);
            }
        });
    };
    // Gets test results to be used in reports
    TestModel.prototype.getSingleReportInfo = function (response, testTakerID, questionBankID) {
        var _this = this;
        console.log('getting single report info');
        var query = this.model.findOne({ testTakerID: testTakerID,
            questionBankID: questionBankID }).sort('-testID');
        var newestTestID;
        query.exec(function (err, itemArray) {
            if (!err && itemArray != null) {
                newestTestID = itemArray.testID;
                var query2 = _this.model.find({ testID: newestTestID,
                    testTakerID: testTakerID,
                    questionBankID: questionBankID });
                query2.exec(function (err, itemArray) {
                    if (!err) {
                        response.json(itemArray);
                    }
                    else {
                        console.log(err);
                    }
                    ;
                });
            }
            else {
                if (itemArray == null)
                    console.log('no test results data');
                console.log(err);
            }
            ;
        });
    };
    return TestModel;
}());
exports.TestModel = TestModel;
