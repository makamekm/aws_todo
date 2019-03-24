import { from, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import * as ORM from "typeorm";

export class DBConnection {
    public static setManager(manager: ORM.ConnectionManager) {
        this.manager = manager;
    }
    private static manager: ORM.ConnectionManager = ORM.getConnectionManager();

    private config: ORM.ConnectionOptions;

    constructor(config: ORM.ConnectionOptions) {
        this.config = config;
    }

    public connect(): [Observable<ORM.Connection>, () => Promise<void>, () => ORM.Connection] {
        const connectionPromise = this.createConnection();
        let connection: ORM.Connection;
        return [
            from(connectionPromise)
                .pipe(
                    tap((_connection) => {
                        connection = _connection;
                    }),
                ),
            async () => await connection.close(),
            () => connection,
        ];
    }

    private async createConnection(config: ORM.ConnectionOptions = this.config): Promise<ORM.Connection> {
        const name = (Math.random() * 100000).toFixed(0).toString();
        const connection = DBConnection.manager.create({
            ...config,
            name,
        });
        await connection.connect();
        return connection;
    }
}
