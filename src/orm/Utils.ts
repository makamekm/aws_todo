import { getConfig } from "../config";
import { DBConnection } from "./DBConnection";
import { DBRegistry } from "./DBRegistry";
import { DBLogger } from "./DBLogger";

export function initializeDBConnection(scope: string = "default"): DBConnection {
    const config = JSON.parse(JSON.stringify(getConfig().db[scope]));
    config.autoSchemaSync = false;
    config.entities = DBRegistry.getEntities(scope);
    config.logging = "all";
    config.logger = new DBLogger();
    return new DBConnection(config);
}

export async function forEachConfigDBScopes(callback: (name: string) => Promise<void>) {
    const promises: Array<Promise<void>> = [];
    Object.keys(getConfig().db).forEach((name) => {
        promises.push(callback(name));
    });
    await Promise.all(promises);
}
