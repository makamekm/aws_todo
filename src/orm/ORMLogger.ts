import * as TypeORM from "typeorm";

import * as Log from "../log";

const LOG_TYPE = "typeorm";

export class ORMLogger implements TypeORM.Logger {
    private _Log = Log;

    public setLog(_Log = Log) {
        this._Log = _Log;
    }

    public logMigration(message: string, queryRunner?: TypeORM.QueryRunner) {
        this._Log.info(LOG_TYPE, "migration", message);
    }

    public logQuery(query: string, parameters?: any[], queryRunner?: TypeORM.QueryRunner) {
        this._Log.debug(LOG_TYPE, "log", JSON.stringify(parameters), query);
    }

    public logQueryError(error: string, query: string, parameters?: any[], queryRunner?: TypeORM.QueryRunner) {
        this._Log.error(LOG_TYPE, "error", error, JSON.stringify(parameters), query);
    }

    public logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: TypeORM.QueryRunner) {
        this._Log.error(LOG_TYPE, "slow", time.toString(), JSON.stringify(parameters), query);
    }

    public logSchemaBuild(message: string, queryRunner?: TypeORM.QueryRunner) {
        this._Log.info(LOG_TYPE, "schema_build", message);
    }

    public log(level, message: any, queryRunner?: TypeORM.QueryRunner) {
        this._Log.log(level, LOG_TYPE, message);
    }
}
