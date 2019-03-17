import { ORMManager } from "./ORMManager";
import { forEachConfigDBScopes, initializeORMScope } from "./Utils";

describe("Orm", () => {
    describe("Utils", () => {
        it("should initializeORMScope return ORMManager", () => {
            const manager = initializeORMScope();
            expect(manager).toBeInstanceOf(ORMManager);
        });

        it("should forEachConfigDBScopes call callback", () => {
            const spy = jest.fn();
            forEachConfigDBScopes(spy);
            expect(spy).toBeCalled();
        });
    });
});
