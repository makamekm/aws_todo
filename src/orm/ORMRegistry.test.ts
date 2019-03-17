import { ORMRegistry } from "./ORMRegistry";

describe("Orm", () => {
    describe("ORMRegistry", () => {
        beforeEach(() => {
            ORMRegistry.cleanEntities();
        });

        it("should RegisterEntity", async () => {
            const spy = {};
            ORMRegistry.RegisterEntity("test")(spy);
            const expected = ORMRegistry.getEntities()[0];
            expect(expected).toMatchObject(spy);
        });

        it("should addEntity", async () => {
            const spy = {};
            ORMRegistry.addEntity("test", "default", spy);
            const expected = ORMRegistry.getEntities()[0];
            expect(expected).toMatchObject(spy);
        });
    });
});
