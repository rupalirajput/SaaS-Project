"use strict";
exports.__esModule = true;
var googleOauth2_1 = require("./googleOauth2");
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var AccountModel_1 = require("./model/AccountModel");
// Creates a Passport configuration for Google
var GooglePassport = /** @class */ (function () {
    function GooglePassport() {
        var _this = this;
        this.clientId = googleOauth2_1["default"].id;
        this.secretId = googleOauth2_1["default"].secret;
        this.Accounts = new AccountModel_1.AccountModel();
        passport.use(new GoogleStrategy({
            clientID: this.clientId,
            clientSecret: this.secretId,
            callbackURL: "/auth/google/callback",
            profileFields: ['id', 'displayName', 'emails']
        }, function (accessToken, refreshToken, profile, done) {
            console.log('validating google profile:' + JSON.stringify(profile));
            _this.Accounts.model.findOne({ 'userid': profile.id }, function (err, user) {
                if (err)
                    return done(err);
                if (user)
                    return done(null, profile);
                else {
                    var newUser = new AccountModel_1.AccountModel();
                    if (typeof profile.emails != 'undefined' && profile.emails.length > 0)
                        var email = profile.emails[0].value;
                    // TODO: need to change with actual user
                    var role = "student";
                    if (profile.name.givenName == "Jake") {
                        role = "professor";
                    }
                    var jsonObj = { "userid": profile.id, "role": role };
                    newUser.saveUser(jsonObj);
                    return done(null, profile);
                }
            });
            /*  process.nextTick(() => {
                  console.log('validating google profile:' + JSON.stringify(profile));
                  this.userId = profile.id;
                  this.displayName = profile.displayName;
                  this.email = profile.emails[0].value;
                  this.firstName = profile.name.givenName;
                  this.lastName = profile.name.familyName;
                  this.role = "student";
                  if (this.firstName == "rupali") {
                      this.role = "professor";
                  }
                  var jsonObj = {"userid": this.userId, "role": this.role};
                  this.Accounts.saveUser(jsonObj);
                  return done(null, profile);
              });*/
        }));
        passport.serializeUser(function (user, done) {
            done(null, user);
        });
        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
    }
    return GooglePassport;
}());
exports.GooglePassport = GooglePassport;
