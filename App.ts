import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as mongodb from 'mongodb';
import * as url from 'url';
import * as bodyParser from 'body-parser';
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');

import {AccountModel} from './model/AccountModel';
import {QuestionBankModel} from './model/QuestionBankModel';
import {QuestionsModel} from './model/QuestionsModel';
import {DataAccess} from './DataAccess';
import {ReportModel} from './model/ReportModel';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Accounts:AccountModel;
  public Reports:ReportModel;
  //public Tasks:TaskModel;
  public idGenerator:number;
  public questionIdGenerator:number;
  public QuestionBanks:QuestionBankModel;
  public Questions:QuestionsModel;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.idGenerator = 200;
    this.Accounts = new AccountModel();
    this.Reports = new ReportModel();
    //this.Tasks = new TaskModel();
    this.QuestionBanks = new QuestionBankModel();
    this.Questions = new QuestionsModel();
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
   
    router.get('/app/account/', (req, res) => {
        console.log('Query All account');
        this.Accounts.retrieveAllAcccounts(res);
    });

      // get API for retriving single account by userid
    router.get('/app/account/:userid', (req, res) => {
        var id = req.params.userid;
        console.log('Query single user with id: ' + id);
        this.Accounts.retrieveAccountDetails(res, {userid: id});
    });

      // post API for creating an account
    router.post('/app/account/', (req, res) => {
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
           
        // get API for getting all reports
    router.get('/app/report/:userid/reports', (req, res) => {
        var id = req.params.userid;
        console.log("Query single user's reports with id:" + id);
        this.Reports.retrieveAllReportDetails(res, {userid: id});
    });
    
      // get API for getting a single report
    router.get('/app/report/:userid/reports/:reportid', (req, res) => {
        var id = req.params.userid;
        var reportid = req.params.reportid;
        console.log("Query a single report from a single user with user id:" + id + " and report id: " + reportid);
        this.Reports.retrieveSingleReportDetails(res, {userid: id, reportid: reportid});
    
  // retrive all questionBanks
    router.get('/app/questionBanks/', (req, res) => {
      console.log('Query All questionBanks');
      this.QuestionBanks.retrieveAllQuestionBanks(res);
    });
  // retrive questionBank with ID
    router.get('/app/questionBanks/:quesBankID/', (req, res) => {
      var id = req.params.quesBankID;
      console.log('Query single list with id: ' + id);
      this.QuestionBanks.retrieveQuestionBankDetails(res, {quesBankID: id});
    });

  // post data in questionBank
    router.post('/app/questionBanks/', (req, res) => {
      console.log(req.body);
      var jsonObj = req.body;
      jsonObj.quesBankID = this.idGenerator;
      this.QuestionBanks.model.create([jsonObj], (err) => {
          if (err) {
              console.log('object creation failed');
          }
      });
      res.send(this.idGenerator.toString());
      this.idGenerator++;
  });

  // delete question bank
    router.delete('/app/questionBanks/:quesBankID/', (req, res) => {
      var id = req.params.quesBankID;
      console.log('Delete QuestionBank with id: ' + id);
      this.QuestionBanks.deleteQuestionBank(res, {quesBankID: id});
    });

  // update question bank
  router.put('/app/questionBanks/:quesBankID/', (req, res) => {
    console.log(req.body);
    var jsonObj = req.body;
    var id = req.params.quesBankID;
    jsonObj.quesBankID = id;
    this.QuestionBanks.model.update([jsonObj],{questionid: id}, (err) => {
        if (err) {
            console.log('object creation failed');
        }
    });
    res.send(this.idGenerator.toString());
});


  // get all questions 
    router.get('/app/questions/', (req, res) => {
      console.log('Query All questions');
      this.Questions.retrieveAllQuestions(res);
  });

  // get questions of a particular question bank
    router.get('/app/questions/:quesBankID', (req, res) => {
      var id = req.params.quesBankID;
      console.log('Query single list with id: ' + id);
      this.Questions.retrieveQuestionsDetails(res, {quesBankID: id});
  });

  // post data into questions table

    router.post('/app/questions/', (req, res) => {
      console.log(req.body);
      var jsonObj = req.body;
      jsonObj.quesBankID = this.idGenerator;
      this.Questions.model.create([jsonObj], (err) => {
          if (err) {
              console.log('object creation failed');
          }
      });
      res.send(this.idGenerator.toString());
      this.idGenerator++;
  });  

  // delete question bank
    router.delete('/app/questions/:quesid/', (req, res) => {
      var id = req.params.quesid;
      console.log('Delete QuestionBank with id: ' + id);
      this.Questions.deleteQuestion(res, {quesid: id});
    });

     });
    this.expressApp.use('/', router);

    this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    this.expressApp.use('/images', express.static(path.join(__dirname, '/images')));
    this.expressApp.use('/css', express.static(path.join(__dirname, '/css')));
    this.expressApp.use('/fonts', express.static(path.join(__dirname, '/fonts')));
    this.expressApp.use('/img', express.static(path.join(__dirname, '/img')))
    this.expressApp.use('/js', express.static(path.join(__dirname, '/js')));
    this.expressApp.use('/', express.static(path.join(__dirname, '/pages')));
    
  }

}
export {App};
