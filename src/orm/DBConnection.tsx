import { from, Observable } from "rxjs";
import * as ORM from "typeorm";

export class DBConnection {
    private config: ORM.ConnectionOptions;
    private connection: ORM.Connection;
    private connectionPromise: Promise<ORM.Connection>;

    constructor(config: ORM.ConnectionOptions) {
        this.config = config;
    }

    public connect(): Observable<ORM.Connection> {
        return from(this.createConnection());
    }

    private async createConnection(config: ORM.ConnectionOptions = this.config): Promise<ORM.Connection> {
        if (this.connection) {
            return this.connection;
        }
        if (this.connectionPromise) {
            return await this.connectionPromise;
        }
        this.connectionPromise = ORM.createConnection({
            ...config,
        });
        this.connection = await this.connectionPromise;
        return this.connection;
    }
}
