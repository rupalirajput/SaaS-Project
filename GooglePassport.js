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
        this.useridGenerator = 1;
        passport.use(new GoogleStrategy({
            clientID: this.clientId,
            clientSecret: this.secretId,
            callbackURL: "/auth/google/callback",
            profileFields: ['id', 'displayName', 'emails']
        }, function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                console.log('validating google profile:' + JSON.stringify(profile));
                _this.userId = profile.id;
                _this.displayName = profile.displayName;
                _this.email = profile.emails[0].value;
                _this.firstName = profile.name.givenName;
                _this.lastName = profile.name.familyName;
                var jsonObj = { "userid": _this.useridGenerator, "username": _this.displayName,
                    "password": "", "firstName": _this.firstName,
                    "lastName": _this.lastName, "email": _this.email, "role": "professor" };
                _this.Accounts.saveUser(jsonObj);
                _this.useridGenerator++;
                return done(null, profile);
            });
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
