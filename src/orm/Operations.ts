import { connectDB } from "./Executors";
import { forEachConfigDBScopes } from "./Utils";

// export async function testDatabase(_GetManager = GetConnection) {
//     forEachConfigDBScopes(async (name) => {
//         await _GetManager(name).testDatabaseConnection();
//     });
// }

// export async function dropDatabase(_GetManager = GetConnection) {
//     forEachConfigDBScopes(async (name) => {
//         await _GetManager(name).dropDatabaseConnection();
//     });
// }

// export async function synchronizeDatabase(_GetManager = GetConnection) {
//     forEachConfigDBScopes(async (name) => {
//         await _GetManager(name).synchronizeDatabaseConnection();
//     });
// }
