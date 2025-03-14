const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AuthStrategy = require("./AuthStrategy");
const userModel = require("../models/userModel");

class GoogleAuthStrategy extends AuthStrategy {
    constructor(passport) {
        super();
        this.passport = passport; // Store the passport instance
    }

    configureStrategy() {
        this.passport.use(
            new GoogleStrategy(
                {
                    clientID: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    callbackURL: process.env.GOOGLE_CALLBACK_URL,
                },
                (accessToken, refreshToken, profile, done) => {
                    // Use the generic method to find the user
                    userModel.findUserByProviderId("google", profile.id, (err, existingUser) => {
                        if (err) return done(err);
                        if (existingUser) {
                            return done(null, existingUser); // User exists, return the user
                        } else {
                            // User doesn't exist, create a new user
                            userModel.createUser("google", profile, (err, newUser) => {
                                return done(err, newUser);
                            });
                        }
                    });
                }
            )
        );
    }
}

module.exports = GoogleAuthStrategy;