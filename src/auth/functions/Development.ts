import * as passport from "passport";
import * as serverless from "serverless-http";
import { server } from "../../express";

server.get("/auth/development/logout",
    (req, res) => {
        req.logout();
        res.redirect("/");
    },
);

server.post("/auth/development/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
    }),
);

export const auth_development = serverless(server);
