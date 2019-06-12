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
    role: string;
    clientId: string;
    secretId: string;
    public Accounts: AccountModel;

    constructor() {
        this.clientId = googleAppAuth.id;
        this.secretId = googleAppAuth.secret;
        this.Accounts = new AccountModel();

        passport.use(new GoogleStrategy({
                clientID: this.clientId,
                clientSecret: this.secretId,
                callbackURL: "/auth/google/callback",
                profileFields: ['id', 'displayName', 'emails']
            },
            (accessToken, refreshToken, profile, done) => {
                console.log('validating google profile:' + JSON.stringify(profile));
                this.Accounts.model.findOne({'userid': profile.id}, function (err, user) {
                    if (err) return done(err);
                    if (user) return done(null, profile);
                    else {
                        var newUser = new AccountModel();
                        if (typeof profile.emails != 'undefined' && profile.emails.length > 0)
                            var email = profile.emails[0].value;

                        // TODO: need to change with actual user
                        var role = "student";
                        if (profile.name.givenName == "rupali") {
                            role = "professor";
                        }
                        var jsonObj = {"userid": profile.id, "role": role};
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
            }
        ));

        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
    }
}

export {GooglePassport};