import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as mongodb from 'mongodb';
import * as url from 'url';
import * as bodyParser from 'body-parser';
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');

import {AccountModel} from './model/AccountModel';
//import {TaskModel} from './model/TaskModel';
import {DataAccess} from './DataAccess';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Accounts:AccountModel;
  //public Tasks:TaskModel;
  public idGenerator:number;
  public questionIdGenerator:number;
    

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.idGenerator = 100;
    this.questionIdGenerator = 1;
    this.Accounts = new AccountModel();
    //this.Tasks = new TaskModel();
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

      // get API for retriving all created accounts
    router.get('/app/account/', (req, res) => {
        console.log('Query All accounts');
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


        // get API for retriving all questions
    router.get('/app/question/', (req, res) => {
        console.log('Query All questions');
        this.Questions.retrieveAllQuestions(res);
    });

      // get API for retriving single question by questionid
    router.get('/app/question/:questionid', (req, res) => {
        var id = req.params.questionid;
        console.log('Query single question with id: ' + id);
        this.Questions.retrieveQuestionDetails(res, {questionid: id});
    });

      // post API for creating an question
    router.post('/app/question/', (req, res) => {
        console.log(req.body);
        var jsonObj = req.body;
        jsonObj.questionid = this.questionIdGenerator;
        this.Questions.model.create([jsonObj], (err) => {
            if (err) {
                console.log('question creation failed');
            }
        });
        res.send(this.questionIdGenerator.toString());
        this.questionIdGenerator++;
      });

      // update a specific question
    router.put('/app/question/:questionid', (req, res) => {
        console.log(req.body);
        var jsonObj = req.body;
        var id = req.params.questionid;
        jsonObj.questionid = this.questionIdGenerator;
        this.Questions.model.update([jsonObj],{questionid: id}, (err) => {
            if (err) {
                console.log('question updation failed');
            }
        });
    });

        // delete API for deleting single question by questionid
    router.delete('/app/question/:questionid', (req, res) => {
        var id = req.params.questionid;
        console.log('Delete single question with id: ' + id);
        this.Questions.deleteQuestionDetails(res, {questionid: id}, (err) => {
            if (err) {
                console.log('question deletion failed');
            }
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