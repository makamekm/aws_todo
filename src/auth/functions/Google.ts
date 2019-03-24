import * as passport from "passport";
import { runHandler, server } from "../../express";

server.post("/auth/google/login",
  passport.authenticate("google", {
    scope: ["profile"],
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

export const auth_google = runHandler();
