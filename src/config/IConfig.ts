import * as ORM from "typeorm";
import {
    LogLevel,
} from "../log";

export interface ITypeORMConfigScope {
    [name: string]: ORM.ConnectionOptions;
}

export interface IAdditionalInformation {
    [name: string]: (IAdditionalInformation | string | number | boolean);
}

export interface IRedisConfigScope {
    [name: string]: {
        port: number;
        host: string;
        password?: string;
        scope?: string;
    };
}

export interface IConfigScope {
    [name: string]: IConfig;
}

export interface IConfig {
    // Log to console with level: [debug, info, warn, error] ["info", "warn", "debug", "error"]
    logLevel?: LogLevel;
    // additional log messages to console [string[]]
    additionalLogMessages?: string[];
    // ORM via typeorm [scope: typeorm object]
    db?: ITypeORMConfigScope;
    // client config in state will be available in browser store [json object]
    publicConfig?: any;
}
