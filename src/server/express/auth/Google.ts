import * as passport from "passport";
import {  server } from "../";

server.use("/auth/google/login",
  (req, res, next) => {
    const headers = req.headers;
    let url = process.env.HOST_URL || headers.host;
    const nowBaseUrl = headers["x-now-deployment-url"];
    if (nowBaseUrl) {
      const nowProto = headers["x-forwarded-proto"];
      url = `${nowProto}://${nowBaseUrl}`;
    }
    return passport.authenticate("google", {
      scope: ["profile"],
      callbackURL: `${url}/auth/google/callback`,
    })(req, res, next);
  },
);

server.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/");
  },
);
