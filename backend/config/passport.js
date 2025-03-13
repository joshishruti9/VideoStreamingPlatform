const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("../models/userModel");
require("dotenv").config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
            userModel.findUserByGoogleId(profile.id, (err, existingUser) => {
                if (err) return done(err);
                                if (existingUser) {
                    return done(null, existingUser);
                } else {
                    userModel.createUser(profile, (err, newUser) => {
                        return done(err, newUser);
                    });
                }
            });
        }
    )
);

// Serialize user (store in session)
passport.serializeUser((user, done) => {
    done(null, user.google_id);
});

// Deserialize user (retrieve user from DB)
passport.deserializeUser((googleId, done) => {
    userModel.findUserByGoogleId(googleId, (err, user) => {
        done(err, user);
    });
});
