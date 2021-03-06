"use strict";
exports.__esModule = true;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var QuestionsModel = /** @class */ (function () {
    function QuestionsModel() {
        this.createSchema();
        this.createModel();
    }
    QuestionsModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            questionBankID: Number,
            questionBankName: String,
            questionID: Number,
            questionText: String,
            category: String,
            options: [String, String, String, String],
            answer: String
        }, { collection: 'questions' });
    };
    QuestionsModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("questions", this.schema);
    };
    QuestionsModel.prototype.retrieveAllQuestions = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            if (!err) {
                response.json(itemArray);
            }
            else {
                console.log(err);
            }
        });
    };
    QuestionsModel.prototype.retrieveQuestionsDetails = function (response, filter) {
        var query = this.model.find(filter);
        query.exec(function (err, itemArray) {
            if (!err) {
                response.json(itemArray);
            }
            else {
                console.log(err);
            }
        });
    };
    QuestionsModel.prototype.retrieveQuestionByID = function (response, filter) {
        var query = this.model.find(filter);
        query.exec(function (err, itemArray) {
            if (!err) {
                response.json(itemArray);
            }
            else {
                console.log(err);
            }
        });
    };
    QuestionsModel.prototype.deleteQuestion = function (response, filter) {
        var query = this.model.findOneAndRemove(filter);
        query.exec(function (err, itemArray) {
            if (!err) {
                response.json(itemArray);
            }
            else {
                console.log(err);
            }
        });
    };
    return QuestionsModel;
}());
exports.QuestionsModel = QuestionsModel;
