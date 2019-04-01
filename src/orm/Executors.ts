import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
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

export async function executeDB<T>(
    observable: (connection: ORM.Connection) => Observable<T>,
    scope: string = "default",
): Promise<T> {
    return await connectDB(scope)
        .pipe(
            catchError((err) => {
                console.error(err);
                return throwError(err);
            }),
            switchMap(
                observable,
            ),
            catchError((err) => {
                console.error(err);
                return throwError(err);
            }),
        )
        .toPromise();
}
