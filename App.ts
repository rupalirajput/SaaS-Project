import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as mongodb from 'mongodb';
import * as url from 'url';
import * as bodyParser from 'body-parser';

import {AccountModel} from './model/AccountModel';
import {QuestionBankModel} from './model/QuestionBankModel';
import {QuestionsModel} from './model/QuestionsModel';
import {DataAccess} from './DataAccess';
import {ReportModel} from './model/ReportModel';
import {TestModel} from './model/TestModel';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Accounts:AccountModel;
  public Reports:ReportModel;
  public idGenerator:number;
  public questionIdGenerator:number;
  public QuestionBanks:QuestionBankModel;
  public Questions:QuestionsModel;
  public Tests:TestModel;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.idGenerator = 200;
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
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.use( (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });


    // ACCOUNTS

    router.get('/account/', (req, res) => {
        console.log('Query All account');
        this.Accounts.retrieveAllAcccounts(res);
    });

      // get API for retriving single account by userid
    router.get('/account/:userid', (req, res) => {
        var id = req.params.userid;
        console.log('Query single user with id: ' + id);
        this.Accounts.retrieveAccountDetails(res, {userid: id});
    });

      // post API for creating an account
    router.post('/account/', (req, res) => {
        console.log(req.body);
        var jsonObj = req.body;
        jsonObj.userid = this.idGenerator;
        this.Accounts.model.create([jsonObj], (err) => {
            if (err) {
                console.log('account creation failed');
            }
        });
        res.send(this.idGenerator.toString());
        this.idGenerator++;
      });








      // REPORTS

    // get API for getting all reports
    router.get('/report/:userid/reports', (req, res) => {
        var id = req.params.userid;
        console.log("Query single user's reports with id:" + id);
        this.Reports.retrieveAllReportDetails(res, {userid: id});
    });

      // get API for getting a single report
    router.get('/report/:userid/reports/:questionBankID', (req, res) => {
        var id = req.params.userid;
        var questionBankID = req.params.questionBankID;
        console.log("Query a single report from a single user with user id:" + id + " and questionBankID id: " + questionBankID);
        this.Reports.retrieveSingleReportDetails(res, {userid: id, questionBankID: questionBankID});
    });



















  // QUESTION BANKS

  // retrive all questionBanks
    router.get('/questionbanks/', (req, res) => {
      console.log('Query All questionBanks');
      this.QuestionBanks.retrieveAllQuestionBanks(res);
    });
  // retrive questionBank with ID
    router.get('/questionBanks/:questionBankID/', (req, res) => {
      var id = req.params.questionBankID;
      console.log('Query single list with id: ' + id);
      this.QuestionBanks.retrieveQuestionBankDetails(res, {questionBankID: id});
    });

  // post data in questionBank
    router.post('/questionBanks/', (req, res) => {
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
    router.delete('/questionBanks/:questionBankID/', (req, res) => {
      var id = req.params.questionBankID;
      console.log('Delete QuestionBank with id: ' + id);
      this.QuestionBanks.deleteQuestionBank(res, {questionBankID: id});
    });

  // update question bank
  router.put('/questionBanks/:questionBankID/', (req, res) => {
    console.log(req.body);
    var jsonObj = req.body;
    var id = req.params.questionBankID;
    jsonObj.questionBankID = id;
    this.QuestionBanks.model.update([jsonObj],{questionid: id}, (err) => {
        if (err) {
            console.log('object creation failed');
        }
    });
    res.send(this.idGenerator.toString());
});





























  // QUESTIONS

  // get all questions
    router.get('/questions/', (req, res) => {
      console.log('Query All questions');
      this.Questions.retrieveAllQuestions(res);
  });

  // get questions of a particular question bank
    router.get('/questions/bank/:questionBankID/', (req, res) => {
      var id = req.params.questionBankID;
      console.log('Query question bank with id: ' + id);
      this.Questions.retrieveQuestionsDetails(res, {questionBankID: id});
  });

   // get question by question id
    router.get('/questions/:questionID/', (req, res) => {
      var id = req.params.questionID;
      console.log('Query single question with id: ' + id);
      this.Questions.retrieveQuestionByID(res, {questionID: id});
  });


  // insert data into questions table
    router.post('/questions/bank/:questionID/', (req, res) => {
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
  router.delete('/questions/:questionID/', (req, res) => {
    var id = req.params.questionID;
    console.log('Delete Question with id: ' + id);
    this.Questions.deleteQuestion(res, {questionID: id});
  });



  // TESTS

  // get API for retrieving all tests
  router.get('/tests/', (req, res) => {
      console.log('Query All tests');
      this.Tests.retrieveAllTests(res);
  });

  // get API for retriving single account by userid
  router.get('/tests/:testid', (req, res) => {
      var id = req.params.testid;
      console.log('Query single test with id: ' + id);
      this.Tests.retrieveOneTest(res, {testID: id});
  });

  // get API for retriving first question for a test
  router.get('/test/:questionBankID', (req, res) => {
      var id = req.params.questionBankID;
      console.log('Query single question with question bank id: ' + id);
      this.Tests.retrieveRandomQuestion(res, id);
  });

  // post API for submitting a question in a test
  /*
  router.post('test/:testid/:questionBankID/:questionID', (req, res) => {
    console.log(req.body);
    var jsonObj = req.body;
    jsonObj.listId = this.idGenerator;
    this.Lists.model.create([jsonObj], (err) => {
        if (err) {
            console.log('object creation failed');
        }
    });
    res.send(this.idGenerator.toString());
    this.idGenerator++;
  });
  */
  // get info to be displayed in report
  router.get('/report/:testTakerID/reports/:questionBankID/testID/:testID', (req, res) => {
    var testTakerID = req.params.testTakerID;
    var questionBankID = req.params.questionBankID;
    var testID = req.params.testID;
    console.log('Query single test results');
    this.Tests.getSingleReportInfo(res, {testTakerID: testTakerID,
    questionBankID: questionBankID, testID: testID});
  });




    this.expressApp.use('/', router);

    this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    this.expressApp.use('/images', express.static(path.join(__dirname, '/images')));
    this.expressApp.use('/css', express.static(path.join(__dirname, '/css')));
    this.expressApp.use('/fonts', express.static(path.join(__dirname, '/fonts')));
    this.expressApp.use('/img', express.static(path.join(__dirname, '/img')))
    this.expressApp.use('/js', express.static(path.join(__dirname, '/js')));
    this.expressApp.use('/', express.static(path.join(__dirname, '/pages')));
    this.expressApp.use('/', express.static(__dirname+'/angularDist'));

  }

}
export {App};
