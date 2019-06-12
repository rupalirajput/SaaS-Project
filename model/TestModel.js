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
    TestModel.prototype.retrieveRandomQuestion = function (response, questionbankid) {
        var query = this.questionModel.find({ questionBankID: Number(questionbankid) }).sort({ questionID: 'desc' });
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
    // Returns new testID for a new test
    TestModel.prototype.retrieveTestID = function (response, questionbankid, testtakerid) {
        var generateTestID = this.model.find({ questionBankID: Number(questionbankid), testTakerID: Number(testtakerid) }).sort({ testID: "desc" });
        generateTestID.exec(function (err, testHistory) {
            if (!err) {
                if (testHistory != (null && undefined)) {
                    var testID = testHistory[0]['testID'] + 1;
                    response.send(testID);
                }
                else {
                    response.send(1);
                }
            }
            else {
                console.log(err);
            }
        });
    };
    // Gets question questions 2 -> end of test
    TestModel.prototype.retrieveNextQuestion = function (response, id, testid, testtakerid) {
        var _this = this;
        // Get test history
        var queryTestHistory = this.model.find({ testID: testid }).select('questionID isCorrect testtakerid').sort({ orderOfQuestionInTest: "desc" });
        queryTestHistory.exec(function (err, testHistory) {
            if (!err) {
                console.log("retrieveCurrentTestHistory: No Error");
                console.log("question array: ", testHistory);
                // Generate array of only question IDs
                var i;
                var testHistoryQuestionIDArray = new Array();
                for (i = 0; i < testHistory.length; i++) {
                    testHistoryQuestionIDArray.push(testHistory[i]['questionID']);
                }
                console.log("Cannot be any one of these ids: ", testHistoryQuestionIDArray);
                // If last answered question was incorrect
                if (testHistory[0]['isCorrect'] == 0) {
                    // Find last correct answer
                    var mustGenerateRandomQuestion = true;
                    for (i = 0; i < testHistory.length; i++) {
                        // If answered correctly, search all questions for new question in
                        // that category
                        if (testHistory[i]['isCorrect'] == 1) {
                            var cat = testHistory[i]['category'];
                            var queryNewQuestionInSpecificCategory = _this.questionModel.findOne({ questionBankID: id, questionID: { "$nin": testHistoryQuestionIDArray }, category: cat });
                            queryNewQuestionInSpecificCategory.exec(function (err, result) {
                                if (!err) {
                                    //If no error and valid question, send response
                                    //Otherwise, continue for loop
                                    if (result != null) {
                                        console.log("Next question is: ", result);
                                        response.json(result);
                                        mustGenerateRandomQuestion = false;
                                    }
                                }
                                else {
                                    console.log(err);
                                }
                            });
                            if (!mustGenerateRandomQuestion) {
                                break;
                            }
                        }
                    }
                }
                // If last answered question was correct
                if (testHistory[0]['isCorrect'] == 1) {
                    var queryNewQuestionNotInCategory = _this.questionModel.findOne({ questionBankID: id, category: { "$nin": cat }, questionID: { "$nin": testHistoryQuestionIDArray } });
                    queryNewQuestionNotInCategory.exec(function (err, result) {
                        if (!err) {
                            // If there are more questions in that category send response
                            // Otherwise prepare to generate random question
                            if (result != null) {
                                console.log("Answered correct. Next question is: ", result);
                                response.json(result);
                                mustGenerateRandomQuestion = false;
                            }
                            else {
                                console.log(err);
                            }
                        }
                    });
                }
                if (mustGenerateRandomQuestion) {
                    var queryRandomQuestion = _this.questionModel.findOne({ questionBankID: id, questionID: { "$nin": testHistoryQuestionIDArray } });
                    queryRandomQuestion.exec(function (err, result) {
                        if (!err) {
                            console.log("Generated random question: ", result);
                            response.json(result);
                        }
                        else {
                            console.log(err);
                        }
                    });
                }
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
