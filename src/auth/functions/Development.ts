import * as passport from "passport";
import { from } from "rxjs";
import * as serverless from "serverless-http";
import { SessionModel } from "../../auth/orm/Session";
import { server } from "../../express";
import { executeDB } from "../../orm";

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
                connection.getRepository(SessionModel)
                    .createQueryBuilder("equity")
                    .orderBy("equity.date", "DESC")
                    .getMany(),
                ),
        );

        res.send(`HELLO! ${sessions.length} sessions are in active`);
    },
);

export const auth_development = (serverless as any)(server);
