import { GetManager } from "./GetManager";
import { forEachConfigDBScopes } from "./Utils";

export async function testDatabase(_GetManager = GetManager) {
    forEachConfigDBScopes(async (name) => {
        await _GetManager(name).testDatabaseConnection();
    });
}

export async function dropDatabase(_GetManager = GetManager) {
    forEachConfigDBScopes(async (name) => {
        await _GetManager(name).dropDatabaseConnection();
    });
}

export async function synchronizeDatabase(_GetManager = GetManager) {
    forEachConfigDBScopes(async (name) => {
        await _GetManager(name).synchronizeDatabaseConnection();
    });
}
