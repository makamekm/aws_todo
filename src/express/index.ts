import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as session from "express-session";
import * as passport from "passport";
import * as GoogleStrategy from "passport-google-oauth20";
import * as LocalStrategy from "passport-local";
import { SessionStore } from "./SessionStore";

passport.use(new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password",
    },
    (username, password, done) => {
        done(null, {
            id: "test",
        });
    },
));

passport.use(new GoogleStrategy({
    clientID: "GOOGLE_CLIENT_ID",
    clientSecret: "GOOGLE_CLIENT_SECRET",
    callbackURL: "http://www.example.com/auth/google/callback",
},
    (accessToken, refreshToken, profile, done) => {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
    },
));

const app = express();

passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log(id);
    done(null, {
        id,
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "todo",
    cookie: {
        maxAge: 60000,
    },
    resave: false,
    saveUninitialized: false,
    store: new SessionStore(),
}));

app.use(passport.initialize());
app.use(passport.session());

export const server = app;
