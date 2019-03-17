import { getConfig } from "../config";
import { isWritableLevel, LogLevel } from "./LogLevel";

export const log = (level: LogLevel, ...messages: string[]) => {
    const targetLogLevel = getConfig().logLevel;
    if (isWritableLevel(level, targetLogLevel)) {
        const additionalLogMessages = getConfig().additionalLogMessages || [];
        // tslint:disable-next-line
        console.log(...additionalLogMessages, ...messages);
    }
};

export const error = (...messages: string[]) => {
    log("error", ...messages);
};

export const debug = (...messages: string[]) => {
    log("debug", ...messages);
};

export const warn = (...messages: string[]) => {
    log("warn", ...messages);
};

export const info = (...messages: string[]) => {
    log("info", ...messages);
};
