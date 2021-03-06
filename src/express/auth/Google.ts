import * as passport from "passport";
import {  server } from "../";

server.use("/auth/google/login",
  passport.authenticate("google", {
    scope: ["profile"],
  }),
);

server.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/");
  },
);
