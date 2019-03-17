import { ORMManager } from "./ORMManager";
import { initializeORMScope } from "./Utils";

const managerStore: { [name: string]: ORMManager } = {};

export function GetManager(scope: string = "default", init: boolean = false): ORMManager {
    if (!managerStore[scope] || init) {
        managerStore[scope] = initializeORMScope(scope);
    }
    return managerStore[scope];
}
