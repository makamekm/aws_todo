import * as passport from "passport";
import {  server } from "../express";

server.post("/auth/google/login",
  passport.authenticate("google", {
    scope: ["profile"],
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);
