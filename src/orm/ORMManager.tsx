import * as ORM from "typeorm";
import { debug } from "../log";

export class ORMManager {
    public static setManager(manager: ORM.ConnectionManager) {
        this.manager = manager;
    }
    private static manager: ORM.ConnectionManager = ORM.getConnectionManager();

    private connection: ORM.Connection;
    private connectionPromise: Promise<ORM.Connection>;
    private config: ORM.ConnectionOptions;
    private name: string;

    constructor(name: string, config: ORM.ConnectionOptions) {
        this.name = name;
        this.config = config;
    }

    public async connect(): Promise<ORM.Connection> {
        if (!this.connection && !this.connectionPromise) {
            const resolve = async () => {
                this.connection = await this.initConnection(this.config);
                return this.connection;
            };
            this.connectionPromise = resolve();
        }
        await this.connectionPromise;
        return this.connection;
    }

    public async close(): Promise<void> {
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
            this.connectionPromise = null;
        }
    }

    public async testDatabaseConnection() {
        await this.connect();
    }

    public async synchronizeDatabaseConnection(mode: "passive" | "force" | "standard" = "standard") {
        const connection = await this.connect();
        if (mode === "force") {
            try {
                await connection.synchronize();
            } catch (e) {
                await connection.synchronize(true);
            }
        } else if (mode === "passive") {
            try {
                await connection.synchronize();
            } catch (e) {
                debug(e.message);
            }
        } else if (mode === "standard") {
            await connection.synchronize();
        }
    }

    public async dropDatabaseConnection() {
        const connection = await this.connect();
        await connection.dropDatabase();
    }

    private async closeOldConnection() {
        if (ORMManager.manager.has(this.name)) {
            const oldConnection = ORMManager.manager.get(this.name);
            await oldConnection.close();
        }
    }

    private async initConnection(config: ORM.ConnectionOptions): Promise<ORM.Connection> {
        await this.closeOldConnection();
        const connection = ORMManager.manager.create({
            ...config,
            name: this.name,
        });
        await connection.connect();
        return connection;
    }
}
