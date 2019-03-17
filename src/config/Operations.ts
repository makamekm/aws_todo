import * as fs from "fs";
import * as path from "path";
import defaultConfig from "./DefaultConfig";
import { IConfig, IConfigScope } from "./IConfig";
import { replaceEnvVars } from "./Utils";

const CONFIG_PATH = path.resolve(process.env.CONFIG_PATH || "./config.json");
const CONFIG_NAME = process.env.CONFIG_SCOPE || "default";

let config: IConfigScope;
applyDefaultConfig();

export function applyDefaultConfig() {
    config = cloneConfig(defaultConfig);
}

function parseConfig(configString: string): IConfigScope {
    return JSON.parse(replaceEnvVars(configString));
}

function cloneConfig(configState: IConfigScope): IConfigScope {
    return parseConfig(JSON.stringify(configState));
}

function stringifyConfig(configState: IConfigScope): string {
    return JSON.stringify(configState, null, 2);
}

export function getConfig(): IConfig {
    return config[CONFIG_NAME];
}

export function setConfig(configState: IConfigScope) {
    config = {
        ...config,
        ...cloneConfig(configState),
    };
}

export function readConfig(_fs = fs) {
    if (_fs.existsSync(CONFIG_PATH)) {
        config = {
            ...config,
            ...parseConfig(_fs.readFileSync(CONFIG_PATH, "utf8")),
        };
    } else {
        throw new Error(`The config does not exist using a path: ${CONFIG_PATH}`);
    }
}

export const saveConfig = (_fs = fs) => {
    if (_fs.existsSync(CONFIG_PATH)) {
        _fs.writeFileSync(CONFIG_PATH, stringifyConfig(config), {
            encoding: "utf8",
        });
    } else {
        _fs.writeFileSync(CONFIG_PATH, stringifyConfig(config), {
            encoding: "utf8",
            flag: "wx",
        });
    }
};
