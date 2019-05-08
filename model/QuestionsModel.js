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
            quesBankID: Number,
            questions: [
                {
                    quesid: Number,
                    questiontext: String,
                    description: String,
                    options: [{ opt1: String, opt2: String }],
                    answer: String
                }
            ]
        });
    };
    QuestionsModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("questions", this.schema);
    };
    QuestionsModel.prototype.retrieveAllQuestions = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    QuestionsModel.prototype.retrieveQuestionsDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    QuestionsModel.prototype.deleteQuestion = function (response, filter) {
        this.model.remove(filter);
        response.json(filter);
    };
    return QuestionsModel;
}());
exports.QuestionsModel = QuestionsModel;
