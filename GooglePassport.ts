import googleAppAuth from './googleOauth2';

let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
import {AccountModel} from './model/AccountModel';

// Creates a Passport configuration for Google
class GooglePassport {

    userId: string;
    displayName: string;
    firstName: string;
    lastName: string;
    email: string;
    clientId: string;
    secretId: string;
    public Accounts:AccountModel;
    public useridGenerator:number;
    
    constructor() {
        this.clientId = googleAppAuth.id;
        this.secretId = googleAppAuth.secret;
        this.Accounts = new AccountModel();
        this.useridGenerator = 1;

        passport.use(new GoogleStrategy({
                clientID: this.clientId,
                clientSecret: this.secretId,
                callbackURL: "/auth/google/callback",
                profileFields: ['id', 'displayName', 'emails']
            },
            (accessToken, refreshToken, profile, done) => {
                process.nextTick( () => {
                    console.log('validating google profile:' + JSON.stringify(profile));
                    this.userId = profile.id;
                    this.displayName = profile.displayName;
                    this.email = profile.emails[0].value;
                    this.firstName =  profile.name.givenName;
                    this.lastName =  profile.name.familyName;
                    var jsonObj = { "userid": this.useridGenerator, "username": this.displayName,
                                    "password" : "", "firstName" : this.firstName,
                                    "lastName" : this.lastName, "email" : this.email, "role":"professor" };
                    this.Accounts.saveUser(jsonObj);
                    this.useridGenerator++;
                    return done(null, profile);
                });
            }
        ));

        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });
    }
}
export {GooglePassport};