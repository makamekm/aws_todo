import { Store } from "express-session";
import { SessionModel } from "../auth/orm/Session";
import { GetManager } from "../orm";

export class SessionStore extends Store {
    public async get(sid, fn) {
        // fn(null, result);

        const manager = GetManager();
        const connection = await manager.connect();
        const repository = connection.getRepository(SessionModel);
    }

    public set(sid, sess, fn) {
    }

    public destroy(sid, fn) {
    }

    public touch(sid, sess, fn) {
    }

    public ids(fn) {
    }

    public length(fn) {
    }

    public all(fn) {
    }
}
