import { Store } from "express-session";
import { SessionModel } from "../auth/orm/Session";
import { GetManager } from "../orm";

export class SessionStore extends Store {
    public async get(sid, fn) {
        const manager = GetManager();
        const connection = await manager.connect();
        const repository = connection.getRepository(SessionModel);
        const session = await repository.findOne({
            where: {
                sid,
            },
        });
        try {
            const data = JSON.parse(session.data);
            return fn(null, data);
        } catch (er) {
            return fn(er);
        }
    }

    public async set(sid, sess, fn) {
        const manager = GetManager();
        const connection = await manager.connect();
        const repository = connection.getRepository(SessionModel);
        const session = new SessionModel();
        try {
            session.sid = sid;
            session.data = JSON.stringify(sess);
        } catch (er) {
            return fn(er);
        }
        await repository.save(session);
        fn(null, sess);
    }

    public async destroy(sid, fn) {
        const manager = GetManager();
        const connection = await manager.connect();
        const repository = connection.getRepository(SessionModel);
        const session = await repository.findOne({
            where: {
                sid,
            },
        });
        await repository.remove(session);
        return fn(null, null);
    }

    public async touch(sid, sess, fn) {
        const manager = GetManager();
        const connection = await manager.connect();
        const repository = connection.getRepository(SessionModel);
        const session = await repository.findOne({
            where: {
                sid,
            },
        });
        try {
            session.sid = sid;
            session.data = JSON.stringify(sess);
        } catch (er) {
            return fn(er);
        }
        await repository.save(session);
        return fn(null, sess);
    }

    // public ids(fn) {
    // }

    // public length(fn) {
    // }

    // public all(fn) {
    // }
}
