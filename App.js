"use strict";
exports.__esModule = true;
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var session = require("express-session");
var AccountModel_1 = require("./model/AccountModel");
var QuestionBankModel_1 = require("./model/QuestionBankModel");
var QuestionsModel_1 = require("./model/QuestionsModel");
var ReportModel_1 = require("./model/ReportModel");
var TestModel_1 = require("./model/TestModel");
var GooglePassport_1 = require("./GooglePassport");
var passport = require('passport');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.googlePassport = new GooglePassport_1.GooglePassport();
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.idGenerator = 200;
        this.useridGenerator = 1;
        this.questionIdGenerator = 1001;
        this.Accounts = new AccountModel_1.AccountModel();
        this.Reports = new ReportModel_1.ReportModel();
        this.QuestionBanks = new QuestionBankModel_1.QuestionBankModel();
        this.Questions = new QuestionsModel_1.QuestionsModel();
        this.Tests = new TestModel_1.TestModel();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(logger('dev'));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(cookieSession({
            name: 'session',
            keys: ['123']
        }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(session({ secret: 'keyboard cat' }));
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    };
    App.prototype.validateAuth = function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            return next();
        }
        console.log("user is not authenticated");
        res.redirect('/');
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        router.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));
        router.get('/auth/google/callback', passport.authenticate('google', {
            failureRedirect: '/login'
        }), function (req, res) {
            req['session']['user'] = req['user'];
            // TODO: need to change with actual user
            if (req['user']['name']['givenName'] == "Jake") {
                res.redirect("/#/professor_dashboard/");
            }
            else {
                res.redirect("/#/student_dashboard/");
            }
        });
        router.get('/displayInfo', this.validateAuth, function (req, res) {
            res.json(req['session']['user']);
        });
        /* router.get('/auth/google/callback',
             function (req, res, next) {
                 passport.authenticate('google', function (err, user) {
                     if (err) {
                         return next(err)
                     }
                     if (!user) {
                         return res.redirect('/login');
                     }
                     // TODO: need to change with actual user
                     if (user.name.givenName == "Rupali") {
                         return res.redirect("/#/professor_dashboard/" + user.id + "/" + user.displayName);
                     }
                     else {
                         return res.redirect("/#/student_dashboard/" + user.id + "/" + user.displayName);
                     }
                 })(req, res, next);
                 return;
             }
         );*/
        // ACCOUNTS
        router.get('/account/', this.validateAuth, function (req, res) {
            console.log('Query All account');
            _this.Accounts.retrieveAllAcccounts(res);
        });
        // get API for retriving single account by userid
        router.get('/account/:email', this.validateAuth, function (req, res) {
            var email = req.params.email;
            console.log('Query single user with email: ' + email);
            _this.Accounts.retrieveAccountDetails(res, { email: email });
        });
        // post API for creating an account
        router.post('/account/', this.validateAuth, function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.userid = _this.useridGenerator;
            _this.Accounts.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('account creation failed');
                }
            });
            res.send(_this.useridGenerator.toString());
            _this.useridGenerator++;
        });
        // REPORTS
        // get API for getting all reports
        router.get('/report/:userid/reports', this.validateAuth, function (req, res) {
            var id = req.params.userid;
            console.log("Query single user's reports with id:" + id);
            _this.Reports.retrieveAllReportDetails(res, { userid: id });
        });
        /* // get API for getting a single report
       router.get('/report/:userid/reports/:questionBankID', (req, res) => {
           var id = req.params.userid;
           var questionBankID = req.params.questionBankID;
           console.log("Query a single report from a single user with user id:" + id + " and questionBankID id: " + questionBankID);
           this.Reports.retrieveSingleReportDetails(res, {userid: id, questionBankID: questionBankID});
       });*/
        // QUESTION BANKS
        // retrive all questionBanks
        router.get('/questionBanks/', this.validateAuth, function (req, res) {
            console.log('Query All questionBanks');
            _this.QuestionBanks.retrieveAllQuestionBanks(res);
        });
        // retrive questionBank with ID
        router.get('/questionBanks/:questionBankID/', this.validateAuth, function (req, res) {
            var id = req.params.questionBankID;
            console.log('Query single list with id: ' + id);
            _this.QuestionBanks.retrieveQuestionBankDetails(res, { questionBankID: id });
        });
        // post data in questionBank
        router.post('/questionBanks/', this.validateAuth, function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.questionBankID = _this.idGenerator;
            _this.QuestionBanks.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        // delete question bank
        router["delete"]('/questionBanks/:questionBankID/', this.validateAuth, function (req, res) {
            var id = req.params.questionBankID;
            console.log('Delete QuestionBank with id: ' + id);
            _this.QuestionBanks.deleteQuestionBank(res, { questionBankID: id });
        });
        // update question bank
        router.put('/questionBanks/:questionBankID/', this.validateAuth, function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            var id = req.params.questionBankID;
            jsonObj.questionBankID = id;
            _this.QuestionBanks.model.findOneAndUpdate({ questionBankID: id }, req.body, { "new": true }, function (err) {
                if (err) {
                    console.log('object creation failed');
                    console.log(err);
                }
                else {
                    res.sendStatus(200);
                }
            });
        });
        // QUESTIONS
        // get all questions
        router.get('/questions/', this.validateAuth, function (req, res) {
            console.log('Query All questions');
            _this.Questions.retrieveAllQuestions(res);
        });
        // get questions of a particular question bank
        router.get('/questions/bank/:questionBankID/', this.validateAuth, function (req, res) {
            var id = req.params.questionBankID;
            console.log('Query question bank with id: ' + id);
            _this.Questions.retrieveQuestionsDetails(res, { questionBankID: id });
        });
        // get question by question id
        router.get('/questions/:questionID/', this.validateAuth, function (req, res) {
            var id = req.params.questionID;
            console.log('Query single question with id: ' + id);
            _this.Questions.retrieveQuestionByID(res, { questionID: id });
        });
        // insert data into questions table
        router.post('/questions/bank/:questionID/', this.validateAuth, function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            var id = req.params.questionBankID;
            jsonObj.questionID = _this.questionIdGenerator;
            _this.Questions.model.create([jsonObj], { questionBankID: id }, function (err) {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send(_this.questionIdGenerator.toString());
            _this.questionIdGenerator++;
        });
        // delete question
        router["delete"]('/questions/:questionID/', this.validateAuth, function (req, res) {
            var id = req.params.questionID;
            console.log('Delete Question with id: ' + id);
            _this.Questions.deleteQuestion(res, { questionID: id });
        });
        // TESTS
        // get API for retrieving all tests
        router.get('/tests/', this.validateAuth, function (req, res) {
            console.log('Query All tests');
            _this.Tests.retrieveAllTests(res);
        });
        // get API for retriving single account by userid
        router.get('/tests/:testid', this.validateAuth, function (req, res) {
            var id = req.params.testid;
            console.log('Query single test with id: ' + id);
            _this.Tests.retrieveOneTest(res, { testID: id });
        });
        // get API for the first question in a test
        router.get('/test/:questionBankID', this.validateAuth, function (req, res) {
            var questionBankID = req.params.questionBankID;
            console.log('Query single question with question bank id: ' + questionBankID);
            _this.Tests.retrieveRandomQuestion(res, questionBankID);
        });
        // get API for a testID for a new test
        router.get('/test/:questionBankID/:testTakerID', this.validateAuth, function (req, res) {
            var questionBankID = req.params.questionBankID;
            var testTakerID = req.params.testTakerID;
            console.log('Looking up last testID for questionBank ' + questionBankID + ' and testTaker ' + testTakerID);
            _this.Tests.retrieveTestID(res, questionBankID, testTakerID);
        });
        // get API for retriving 2nd -> end questions on a test
        router.get('/test/:questionBankID/:testID/:testTakerID', this.validateAuth, function (req, res) {
            var questionBankID = req.params.questionBankID;
            var testID = req.params.testID;
            var testTakerID = req.params.testTakerID;
            console.log('Query single question with question bank id ' + questionBankID + ' and testID ' + testID);
            _this.Tests.retrieveNextQuestion(res, questionBankID, testID, testTakerID);
        });
        // post API for submitting a question in a test
        router.post('/test/:questionBankID', this.validateAuth, function (req, res) {
            console.log("Post answer to question in test");
            console.log(req.body);
            var jsonObj = req.body;
            _this.Tests.model.create([jsonObj], function (err) {
                if (err) {
                    console.log("Test record creation failed");
                }
            });
            res.send(req.body);
        });
        /*
        // get info to be displayed in report
        router.get('/report/:testTakerID/reports/:questionBankID/testID/:testID', (req, res) => {
          var testTakerID = req.params.testTakerID;
          var questionBankID = req.params.questionBankID;
          var testID = req.params.testID;
          console.log('Query single test results');
          this.Tests.getSingleReportInfo(res, {testTakerID: testTakerID,
          questionBankID: questionBankID, testID: testID});
        });*/
        router.get('/report/:testTakerID/reports/:questionBankID', this.validateAuth, function (req, res) {
            var testTakerID = req.params.testTakerID;
            var questionBankID = req.params.questionBankID;
            console.log('get newest test num');
            _this.Tests.getSingleReportInfo(res, testTakerID, questionBankID);
        });
        /*router.get('/report/:testTakerID/reports/:questionBankID/testID/:testID', (req, res) => {
          var testTakerID = req.params.testTakerID;
          var questionBankID = req.params.questionBankID;
          var testID = req.params.testID;
          console.log('get latest test results info');
          this.Tests.getReportInfo(res, {testTakerID: testTakerID,
          questionBankID: questionBankID, testID:testID});


        });*/
        // Update Question
        router.put('/question/:questionID/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            var id = req.params.questionID;
            jsonObj.questionID = id;
            _this.Questions.model.findOneAndUpdate({ questionID: id }, req.body, { "new": true }, function (err) {
                if (err) {
                    console.log('object creation failed');
                    console.log(err);
                }
                else {
                    res.sendStatus(200);
                }
            });
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(path.join(__dirname, '/images')));
        this.expressApp.use('/css', express.static(path.join(__dirname, '/css')));
        this.expressApp.use('/fonts', express.static(path.join(__dirname, '/fonts')));
        this.expressApp.use('/img', express.static(path.join(__dirname, '/img')));
        this.expressApp.use('/js', express.static(path.join(__dirname, '/js')));
        this.expressApp.use('/', express.static(path.join(__dirname, '/pages')));
        this.expressApp.use('/', express.static(__dirname + '/angularDist'));
    };
    return App;
}());
exports.App = App;
