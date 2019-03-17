function replaceStandardEnv(str: string) {
    let result: RegExpExecArray;
    // tslint:disable-next-line
    while (result = /\$\{(\w+)\}/gi.exec(str)) {
        str = str.replace("${" + result[1] + "}", process.env[result[1]]);
    }
    return str;
}

function replaceDefaultEnv(str: string) {
    let result: RegExpExecArray;
    // tslint:disable-next-line
    while (result = /\$\{(\w+):(\w+)\}/gi.exec(str)) {
        str = str.replace("${" + result[1] + ":" + result[2] + "}", process.env[result[1]] || result[2]);
    }
    return str;
}

export function replaceEnvVars(str: string) {
    let processedStr = str;
    processedStr = replaceStandardEnv(processedStr);
    processedStr = replaceDefaultEnv(processedStr);
    return processedStr;
}
