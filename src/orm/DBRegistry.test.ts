import { DBRegistry } from "./DBRegistry";

describe("Orm", () => {
    describe("ORMRegistry", () => {
        beforeEach(() => {
            DBRegistry.cleanEntities();
        });

        it("should RegisterEntity", async () => {
            const spy = {};
            DBRegistry.RegisterEntity("test")(spy);
            const expected = DBRegistry.getEntities()[0];
            expect(expected).toMatchObject(spy);
        });

        it("should addEntity", async () => {
            const spy = {};
            DBRegistry.addEntity("test", "default", spy);
            const expected = DBRegistry.getEntities()[0];
            expect(expected).toMatchObject(spy);
        });
    });
});
