import * as passport from "passport";
import { from } from "rxjs";
import { server } from "../";
import { executeDB } from "../../../orm";
import { SessionModel } from "../auth/orm/Session";

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

    server.use("/auth/development/test",
        async (req, res, next) => {
            const sessions = await executeDB(
                (connection) => from(
                    connection.getMongoRepository(SessionModel)
                        .createQueryBuilder("equity")
                        .orderBy("equity.date", "DESC")
                        .getMany(),
                    ),
            );

            res.send(`HELLO! ${sessions.length} sessions are in active`);
        },
    );
}
