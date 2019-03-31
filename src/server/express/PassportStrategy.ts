import * as passport from "passport";
import * as GoogleStrategy from "passport-google-oauth20";
import * as LocalStrategy from "passport-local";

passport.use(new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password",
    },
    (username, password, done) => {
        console.log("hello!", username, password);

        done(null, {
            id: 0,
            type: "developer",
        });
    },
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET",
},
    (accessToken, refreshToken, profile, done) => {
        console.log("hello!", profile);

        done(null, {
            id: profile.id,
            type: "google",
        });
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
    },
));
