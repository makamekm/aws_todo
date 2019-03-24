import { Observable } from "rxjs";
import { finalize, switchMap } from "rxjs/operators";
import * as ORM from "typeorm";
import { DBConnection } from "./DBConnection";
import { initializeDBConnection } from "./Utils";

const connectionStore: { [name: string]: DBConnection } = {};

export function getDB(scope: string = "default"): DBConnection {
    if (!connectionStore[scope]) {
        connectionStore[scope] = initializeDBConnection(scope);
    }
    return connectionStore[scope];
}

export function connectDB(scope: string = "default") {
    const connection = getDB(scope);
    return connection.connect();
}

export async function executeDB<T>(observable: (connection: ORM.Connection) => Observable<T>): Promise<T> {
    const [connection$, close] = connectDB();

    return await connection$
        .pipe(
            switchMap(
                observable,
            ),
            finalize(close),
        )
        .toPromise();
}
