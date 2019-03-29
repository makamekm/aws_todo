import * as passport from "passport";
import { server } from "../";

if (!process.env.IS_CLOUD) {
    server.use("/auth/development/logout",
        (req, res) => {
            req.logout();
            res.redirect("/");
        },
    );

    server.use("/auth/development/login",
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
            session: true,
        }),
    );
}
