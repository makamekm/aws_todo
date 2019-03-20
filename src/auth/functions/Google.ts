import * as passport from "passport";
import * as serverless from "serverless-http";
import { server } from "../../express";

server.post("/auth/google/login",
  passport.authenticate("google", {
    scope: ["profile"],
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

export const auth_google = serverless(server);
