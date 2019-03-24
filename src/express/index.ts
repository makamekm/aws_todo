import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as session from "express-session";
import * as passport from "passport";
import * as serverless from "serverless-http";
import { SessionStore } from "./SessionStore";

import "./PassportSerializer";
import "./PassportStrategy";

export const server = (express as any)();
export const runHandler = () => (serverless as any)(server);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(session({
    secret: "todo",
    cookie: {
        maxAge: 60000,
    },
    resave: false,
    saveUninitialized: false,
    store: new SessionStore(),
}));
server.use(passport.initialize());
server.use(passport.session());
