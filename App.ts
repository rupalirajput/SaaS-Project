import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as mongodb from 'mongodb';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';

import {AccountModel} from './model/AccountModel';
import {QuestionBankModel} from './model/QuestionBankModel';
import {QuestionsModel} from './model/QuestionsModel';
import {DataAccess} from './DataAccess';
import {ReportModel} from './model/ReportModel';
import {TestModel} from './model/TestModel';

import {GooglePassport} from './GooglePassport';

let passport = require('passport');
let cookieParser = require('cookie-parser');
let cookieSession = require('cookie-session');

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public expressApp: express.Application;
    public Accounts: AccountModel;
    public Reports: ReportModel;
    public idGenerator: number;
    public questionIdGenerator: number;
    public useridGenerator: number;
    public QuestionBanks: QuestionBankModel;
    public Questions: QuestionsModel;
    public Tests: TestModel;
    public googlePassport: GooglePassport;

    //Run configuration methods on the Express instance.
    constructor() {
        this.googlePassport = new GooglePassport();

        this.expressApp = express();
        this.middleware();
        this.routes();
        this.idGenerator = 200;
        this.useridGenerator = 1;
        this.questionIdGenerator = 1001;
        this.Accounts = new AccountModel();
        this.Reports = new ReportModel();
        this.QuestionBanks = new QuestionBankModel();
        this.Questions = new QuestionsModel();
        this.Tests = new TestModel();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.expressApp.use(logger('dev'));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({extended: false}));
        this.expressApp.use(cookieSession({
            name: 'session',
            keys: ['123']
        }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(session({secret: 'keyboard cat'}));
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    }

    private validateAuth(req, res, next): void {
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            return next();
        }
        console.log("user is not authenticated");
        res.redirect('/');
    }


    // Configure API endpoints.
    private routes(): void {
        let router = express.Router();

        router.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });

        router.get('/auth/google',
            passport.authenticate('google',
                {scope: ['https://www.googleapis.com/auth/plus.login', 'email']}
            )
        );

        router.get('/auth/google/callback',
            passport.authenticate('google',
                {
                    failureRedirect: '/login'
                }
            ),
            function (req, res) {
                req['session']['user'] = req['user'];

                // TODO: need to change with actual user
                if (req['user']['name']['givenName'] == "Rupali") {
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
        router.get('/account/', this.validateAuth, (req, res) => {
            console.log('Query All account');
            this.Accounts.retrieveAllAcccounts(res);
        });

        // get API for retriving single account by userid
        router.get('/account/:email', this.validateAuth, (req, res) => {
            var email = req.params.email;
            console.log('Query single user with email: ' + email);
            this.Accounts.retrieveAccountDetails(res, {email: email});
        });

        // post API for creating an account
        router.post('/account/', this.validateAuth, (req, res) => {
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.userid = this.useridGenerator;
            this.Accounts.model.create([jsonObj], (err) => {
                if (err) {
                    console.log('account creation failed');
                }
            });
            res.send(this.useridGenerator.toString());
            this.useridGenerator++;
        });


        // REPORTS

        // get API for getting all reports
        router.get('/report/:userid/reports', this.validateAuth, (req, res) => {
            var id = req.params.userid;
            console.log("Query single user's reports with id:" + id);
            this.Reports.retrieveAllReportDetails(res, {userid: id});
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
        router.get('/questionBanks/', this.validateAuth, (req, res) => {
            console.log('Query All questionBanks');
            this.QuestionBanks.retrieveAllQuestionBanks(res);
        });
        // retrive questionBank with ID
        router.get('/questionBanks/:questionBankID/', this.validateAuth, (req, res) => {
            var id = req.params.questionBankID;
            console.log('Query single list with id: ' + id);
            this.QuestionBanks.retrieveQuestionBankDetails(res, {questionBankID: id});
        });

        // post data in questionBank
        router.post('/questionBanks/', this.validateAuth, (req, res) => {
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.questionBankID = this.idGenerator;
            this.QuestionBanks.model.create([jsonObj], (err) => {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send(this.idGenerator.toString());
            this.idGenerator++;
        });

        // delete question bank
        router.delete('/questionBanks/:questionBankID/', this.validateAuth, (req, res) => {
            var id = req.params.questionBankID;
            console.log('Delete QuestionBank with id: ' + id);
            this.QuestionBanks.deleteQuestionBank(res, {questionBankID: id});
        });

        // update question bank
        router.put('/questionBanks/:questionBankID/', this.validateAuth, (req, res) => {
            console.log(req.body);
            var jsonObj = req.body;
            var id = req.params.questionBankID;
            jsonObj.questionBankID = id;
            this.QuestionBanks.model.findOneAndUpdate({questionBankID: id}, req.body, {new: true}, (err) => {
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
        router.get('/questions/', this.validateAuth, (req, res) => {
            console.log('Query All questions');
            this.Questions.retrieveAllQuestions(res);
        });

        // get questions of a particular question bank
        router.get('/questions/bank/:questionBankID/', this.validateAuth, (req, res) => {
            var id = req.params.questionBankID;
            console.log('Query question bank with id: ' + id);
            this.Questions.retrieveQuestionsDetails(res, {questionBankID: id});
        });

        // get question by question id
        router.get('/questions/:questionID/', this.validateAuth, (req, res) => {
            var id = req.params.questionID;
            console.log('Query single question with id: ' + id);
            this.Questions.retrieveQuestionByID(res, {questionID: id});
        });


        // insert data into questions table
        router.post('/questions/bank/:questionID/', this.validateAuth, (req, res) => {
            console.log(req.body);
            var jsonObj = req.body;
            var id = req.params.questionBankID;
            jsonObj.questionID = this.questionIdGenerator;
            this.Questions.model.create([jsonObj], {questionBankID: id}, (err) => {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send(this.questionIdGenerator.toString());
            this.questionIdGenerator++;
        });

        // delete question
        router.delete('/questions/:questionID/', this.validateAuth, (req, res) => {
            var id = req.params.questionID;
            console.log('Delete Question with id: ' + id);
            this.Questions.deleteQuestion(res, {questionID: id});
        });


        // TESTS

        // get API for retrieving all tests
        router.get('/tests/', this.validateAuth, (req, res) => {
            console.log('Query All tests');
            this.Tests.retrieveAllTests(res);
        });

        // get API for retriving single account by userid
        router.get('/tests/:testid', this.validateAuth, (req, res) => {
            var id = req.params.testid;
            console.log('Query single test with id: ' + id);
            this.Tests.retrieveOneTest(res, {testID: id});
        });

        // get API for the first question in a test
        router.get('/test/:questionBankID', this.validateAuth, (req, res) => {
            var questionBankID = req.params.questionBankID;
            console.log('Query single question with question bank id: ' + questionBankID);
            this.Tests.retrieveRandomQuestion(res, questionBankID);
        });

        // get API for a testID for a new test
        router.get('/test/:questionBankID/:testTakerID', this.validateAuth, (req, res) => {
            var questionBankID = req.params.questionBankID;
            var testTakerID = req.params.testTakerID;
            console.log('Looking up last testID for questionBank ' + questionBankID + ' and testTaker ' + testTakerID);
            this.Tests.retrieveTestID(res, questionBankID, testTakerID);
        });

        // get API for retriving 2nd -> end questions on a test
        router.get('/test/:questionBankID/:testID/testTakerID', this.validateAuth, (req, res) => {
            var questionBankID = req.params.questionBankID;
            var testID = req.params.testID;
            var testTakerID = req.params.testTakerID;
            console.log('Query single question with question bank id ' + questionBankID + ' and testID ' + testID);
            this.Tests.retrieveNextQuestion(res, questionBankID, testID, testTakerID);
        });

        // post API for submitting a question in a test
        router.post('/test/:questionBankID', this.validateAuth, (req, res) => {
            console.log("Post answer to question in test");
            console.log(req.body);
            var jsonObj = req.body;
            this.Tests.model.create([jsonObj], (err) => {
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
        router.get('/report/:testTakerID/reports/:questionBankID', this.validateAuth, (req, res) => {
            var testTakerID = req.params.testTakerID;
            var questionBankID = req.params.questionBankID;

            console.log('get newest test num');
            this.Tests.getSingleReportInfo(res, testTakerID,
                questionBankID);

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
        router.put('/question/:questionID/', (req, res) => {
          console.log(req.body);
          var jsonObj = req.body;
          var id = req.params.questionID;
          jsonObj.questionBankID = id;
          this.Questions.model.findOneAndUpdate({questionID: id},req.body,{new: true}, (err) => {
              if (err) {
                  console.log('object creation failed');
                  console.log(err);
              }
              else
              {
                res.sendStatus(200);
              }
          });
        });

        this.expressApp.use('/', router);

        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(path.join(__dirname, '/images')));
        this.expressApp.use('/css', express.static(path.join(__dirname, '/css')));
        this.expressApp.use('/fonts', express.static(path.join(__dirname, '/fonts')));
        this.expressApp.use('/img', express.static(path.join(__dirname, '/img')))
        this.expressApp.use('/js', express.static(path.join(__dirname, '/js')));
        this.expressApp.use('/', express.static(path.join(__dirname, '/pages')));
        this.expressApp.use('/', express.static(__dirname + '/angularDist'));

    }

}

export {
    App
};
