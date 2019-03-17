export type LogLevel = "error" | "debug" | "info" | "warn";

export function getLevelNumber(level?: LogLevel) {
    switch (level) {
        case "debug": return 3;
        case "info": return 2;
        case "warn": return 1;
        case "error": return 0;
        default: return -1;
    }
}

export function isWritableLevel(currentLevel: LogLevel, targetLevel: LogLevel) {
    return getLevelNumber(currentLevel) <= getLevelNumber(targetLevel);
}
