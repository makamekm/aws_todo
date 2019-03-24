import { setConfig } from "../config";
import { DBConnection } from "./DBConnection";
import { getDB } from "./Executors";

describe("Orm", () => {
    describe("GetManager", () => {
        it("should return ORMManager", () => {
            const manager = getDB();
            expect(manager).toBeInstanceOf(DBConnection);
        });

        it("should return same instances with a single key", () => {
            const manager = getDB();
            const managerTwo = getDB();
            expect(manager).toMatchObject(managerTwo);
        });

        it("should return deferent instances with deferent keys", () => {
            setConfig({
                default: {
                    db: {
                        key1: {
                            database: "",
                            type: "sqlite",
                        },
                        key2: {
                            database: "",
                            type: "sqlite",
                        },
                    },
                },
            });
            const manager = getDB("key1");
            const managerTwo = getDB("key2");
            expect(manager).not.toMatchObject(managerTwo);
        });

        it("should throw Error a random key", () => {
            expect(() => getDB("random")).toThrowError();
        });
    });
});
