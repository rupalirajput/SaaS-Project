"use strict";
exports.__esModule = true;
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');
var AccountModel_1 = require("./model/AccountModel");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.idGenerator = 100;
        this.Accounts = new AccountModel_1.AccountModel();
        //this.Tasks = new TaskModel();
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
        // get API for retriving all created accounts
        router.get('/app/account/', function (req, res) {
            console.log('Query All accounts');
            _this.Accounts.retrieveAllAcccounts(res);
        });
        router.get('/app/account/:userid', function (req, res) {
            var id = req.params.userid;
            console.log('Query single user with id: ' + id);
            _this.Accounts.retrieveAccountDetails(res, { userid: id });
        });
        // post API for creating an account
        router.post('/app/account/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.userid = _this.idGenerator;
            _this.Accounts.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
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
