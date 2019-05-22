"use strict";
exports.__esModule = true;
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');
var AccountModel_1 = require("./model/AccountModel");
var QuestionBankModel_1 = require("./model/QuestionBankModel");
var QuestionsModel_1 = require("./model/QuestionsModel");
var ReportModel_1 = require("./model/ReportModel");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.idGenerator = 200;
        this.Accounts = new AccountModel_1.AccountModel();
        this.Reports = new ReportModel_1.ReportModel();
        //this.Tasks = new TaskModel();
        this.QuestionBanks = new QuestionBankModel_1.QuestionBankModel();
        this.Questions = new QuestionsModel_1.QuestionsModel();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(logger('dev'));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        // ACCOUNTS
        router.get('/account/', function (req, res) {
            console.log('Query All account');
            _this.Accounts.retrieveAllAcccounts(res);
        });
        // get API for retriving single account by userid
        router.get('/account/:userid', function (req, res) {
            var id = req.params.userid;
            console.log('Query single user with id: ' + id);
            _this.Accounts.retrieveAccountDetails(res, { userid: id });
        });
        // post API for creating an account
        router.post('/account/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.userid = _this.idGenerator;
            _this.Accounts.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('account creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        // REPORTS
        // get API for getting all reports
        router.get('/report/:userid/reports', function (req, res) {
            var id = req.params.userid;
            console.log("Query single user's reports with id:" + id);
            _this.Reports.retrieveAllReportDetails(res, { userid: id });
        });
        // get API for getting a single report
        router.get('/report/:userid/reports/:reportid', function (req, res) {
            var id = req.params.userid;
            var reportid = req.params.reportid;
            console.log("Query a single report from a single user with user id:" + id + " and report id: " + reportid);
            _this.Reports.retrieveSingleReportDetails(res, { userid: id, reportid: reportid });
        });
        // QUESTION BANKS
        // retrive all questionBanks
        router.get('/questionbanks/', function (req, res) {
            console.log('Query All questionBanks');
            _this.QuestionBanks.retrieveAllQuestionBanks(res);
        });
        // retrive questionBank with ID
        router.get('/questionBanks/:quesBankID/', function (req, res) {
            var id = req.params.quesBankID;
            console.log('Query single list with id: ' + id);
            _this.QuestionBanks.retrieveQuestionBankDetails(res, { quesBankID: id });
        });
        // post data in questionBank
        router.post('/questionBanks/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.quesBankID = _this.idGenerator;
            _this.QuestionBanks.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        // delete question bank
        router["delete"]('/questionBanks/:quesBankID/', function (req, res) {
            var id = req.params.quesBankID;
            console.log('Delete QuestionBank with id: ' + id);
            _this.QuestionBanks.deleteQuestionBank(res, { quesBankID: id });
        });
        // update question bank
        router.put('/questionBanks/:quesBankID/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            var id = req.params.quesBankID;
            jsonObj.quesBankID = id;
            _this.QuestionBanks.model.update([jsonObj], { questionid: id }, function (err) {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
        });
        // QUESTIONS
        // get all questions
        router.get('/questions/', function (req, res) {
            console.log('Query All questions');
            _this.Questions.retrieveAllQuestions(res);
        });
        // get questions of a particular question bank
        router.get('/app/questions/:quesBankID', function (req, res) {
            var id = req.params.quesBankID;
            console.log('Query single list with id: ' + id);
            _this.Questions.retrieveQuestionsDetails(res, { quesBankID: id });
        });
        // post data into questions table
        router.post('/app/questions/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.quesBankID = _this.idGenerator;
            _this.Questions.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        // delete question
        router["delete"]('/app/questions/:quesid/', function (req, res) {
            var id = req.params.quesid;
            console.log('Delete QuestionBank with id: ' + id);
            _this.Questions.deleteQuestion(res, { quesid: id });
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(path.join(__dirname, '/images')));
        this.expressApp.use('/css', express.static(path.join(__dirname, '/css')));
        this.expressApp.use('/fonts', express.static(path.join(__dirname, '/fonts')));
        this.expressApp.use('/img', express.static(path.join(__dirname, '/img')));
        this.expressApp.use('/js', express.static(path.join(__dirname, '/js')));
        this.expressApp.use('/', express.static(path.join(__dirname, '/pages')));
    };
    return App;
}());
exports.App = App;
