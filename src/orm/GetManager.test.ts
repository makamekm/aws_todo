import { setConfig } from "../config";
import { GetManager } from "./GetManager";
import { ORMManager } from "./ORMManager";

describe("Orm", () => {
    describe("GetManager", () => {
        it("should return ORMManager", () => {
            const manager = GetManager();
            expect(manager).toBeInstanceOf(ORMManager);
        });

        it("should return same instances with a single key", () => {
            const manager = GetManager();
            const managerTwo = GetManager();
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
            const manager = GetManager("key1");
            const managerTwo = GetManager("key2");
            expect(manager).not.toMatchObject(managerTwo);
        });

        it("should throw Error a random key", () => {
            expect(() => GetManager("random")).toThrowError();
        });
    });
});
