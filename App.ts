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

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.idGenerator = 100;
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
   
    router.get('/app/account/', (req, res) => {
        console.log('Query All account');
        this.Accounts.retrieveAllAcccounts(res);
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