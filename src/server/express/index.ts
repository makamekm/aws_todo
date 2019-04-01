import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import * as session from "express-session";
import * as passport from "passport";
import { SessionStore } from "./auth/SessionStore";

import "./PassportSerializer";
import "./PassportStrategy";

export const server = (express as any)();

server.use((req, res, next) => cors({
    origin: `${req.header("x-forwarded-proto") || "http"}://${req.header("host")}`,
})(req, res, next));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use((req, res, next) => session({
    secret: "todo",
    cookie: {
        path: "/",
        domain: `${req.header("host")}`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    },
    resave: false,
    saveUninitialized: false,
    store: new SessionStore(),
})(req, res, next));
server.use(passport.initialize());
server.use(passport.session());

import "./auth/Development";
import "./auth/Google";

import "./GraphQL";
