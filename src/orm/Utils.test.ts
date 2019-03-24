import { DBConnection } from "./DBConnection";
import { forEachConfigDBScopes, initializeDBConnection as initializeDBConnection } from "./Utils";

describe("Orm", () => {
    describe("Utils", () => {
        it("should initializeORMScope return ORMManager", () => {
            const manager = initializeDBConnection();
            expect(manager).toBeInstanceOf(DBConnection);
        });

        it("should forEachConfigDBScopes call callback", () => {
            const spy = jest.fn();
            forEachConfigDBScopes(spy);
            expect(spy).toBeCalled();
        });
    });
});
