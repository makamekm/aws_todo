import { getConfig } from "../config";
import { ORMLogger } from "./ORMLogger";
import { ORMManager } from "./ORMManager";
import { ORMRegistry } from "./ORMRegistry";

export function initializeORMScope(scope: string = "default"): ORMManager {
    const config = JSON.parse(JSON.stringify(getConfig().db[scope]));
    config.autoSchemaSync = false;
    config.entities = ORMRegistry.getEntities(scope);
    config.logging = "all";
    config.logger = new ORMLogger();
    return new ORMManager(scope, config);
}

export async function forEachConfigDBScopes(callback: (name: string) => Promise<void>) {
    const promises: Array<Promise<void>> = [];
    Object.keys(getConfig().db).forEach((name) => {
        promises.push(callback(name));
    });
    await Promise.all(promises);
}
