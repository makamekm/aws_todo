import { Store } from "express-session";
import { from } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { executeDB } from "../../../orm";
import { SessionModel } from "./orm/Session";

export class SessionStore extends Store {
    public async get(sid, fn) {
        const session = await executeDB(
            (connection) => from(
                connection
                .getMongoRepository(SessionModel)
                .findOne({
                    where: {
                        sid,
                    },
                }),
            ),
        );

        const sess = session && JSON.parse(session.data);
        return fn(null, sess);
    }

    public async set(sid, sess, fn) {
        await executeDB(
            (connection) => from(
                connection
                    .getMongoRepository(SessionModel)
                    .findOne({
                        where: {
                            sid,
                        },
                    }),
            )
            .pipe(
                map((session) => {
                    if (!session) {
                        return new SessionModel();
                    } else {
                        return session;
                    }
                }),
                tap(
                    (session) => {
                        session.sid = sid;
                        session.data = JSON.stringify(sess);
                    },
                ),
                switchMap(
                    (session) => connection
                        .getMongoRepository(SessionModel)
                        .save(session),
                ),
            ),
        );

        fn(null, sess);
    }

    public async destroy(sid, fn) {
        await executeDB(
            (connection) => from(
                connection
                    .getMongoRepository(SessionModel)
                    .findOne({
                        where: {
                            sid,
                        },
                    }),
            )
            .pipe(
                switchMap(
                    (session) => connection
                        .getMongoRepository(SessionModel)
                        .remove(session),
                ),
            ),
        );

        return fn(null, null);
    }

    public async touch(sid, sess, fn) {
        await executeDB(
            (connection) => from(
                connection
                .getRepository(SessionModel)
                .findOne({
                    where: {
                        sid,
                    },
                }),
            )
            .pipe(
                tap(
                    (session) => {
                        session.sid = sid;
                        session.data = JSON.stringify(sess);
                    },
                ),
                switchMap(
                    (session) => connection
                        .getRepository(SessionModel)
                        .save(session),
                ),
            ),
        );

        return fn(null, sess);
    }
}
