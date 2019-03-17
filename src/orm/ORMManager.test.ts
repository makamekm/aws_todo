import { ORMManager } from "./ORMManager";

describe("Orm", () => {
    describe("ORMManager", () => {
        it("should connect", async () => {
            const spy = jest.fn();
            const connection = {
                connect: spy,
            };
            ORMManager.setManager(<any> {
                has: jest.fn(),
                get: jest.fn(),
                create: jest.fn().mockReturnValue(connection),
            });
            const manager = new ORMManager("default", {
                type: "sqlite",
                database: "",
            });
            const expectingConnection = await manager.connect();
            expect(spy).toBeCalled();
            expect(expectingConnection).toMatchObject(connection);
        });

        it("should close", async () => {
            const spy = jest.fn();
            const connection = {
                connect: jest.fn(),
                close: spy,
            };
            ORMManager.setManager(<any> {
                has: jest.fn(),
                get: jest.fn(),
                create: jest.fn().mockReturnValue(connection),
            });
            const manager = new ORMManager("default", {
                type: "sqlite",
                database: "",
            });
            const expectingConnection = await manager.connect();
            await expectingConnection.close();
            expect(spy).toBeCalled();
        });

        it("should testDatabaseConnection", async () => {
            const spy = jest.fn();
            const connection = {
                connect: spy,
            };
            ORMManager.setManager(<any> {
                has: jest.fn(),
                get: jest.fn(),
                create: jest.fn().mockReturnValue(connection),
            });
            const manager = new ORMManager("default", {
                type: "sqlite",
                database: "",
            });
            await manager.testDatabaseConnection();
            expect(spy).toBeCalled();
        });

        it("should dropDatabaseConnection", async () => {
            const spy = jest.fn();
            const connection = {
                connect: jest.fn(),
                dropDatabase: spy,
            };
            ORMManager.setManager(<any> {
                has: jest.fn(),
                get: jest.fn(),
                create: jest.fn().mockReturnValue(connection),
            });
            const manager = new ORMManager("default", {
                type: "sqlite",
                database: "",
            });
            await manager.dropDatabaseConnection();
            expect(spy).toBeCalled();
        });

        it("should synchronizeDatabaseConnection standard", async () => {
            const spy = jest.fn();
            const connection = {
                connect: jest.fn(),
                synchronize: spy,
            };
            ORMManager.setManager(<any> {
                has: jest.fn(),
                get: jest.fn(),
                create: jest.fn().mockReturnValue(connection),
            });
            const manager = new ORMManager("default", {
                type: "sqlite",
                database: "",
            });
            await manager.synchronizeDatabaseConnection();
            expect(spy).toBeCalled();
        });

        it("should synchronizeDatabaseConnection force", async () => {
            const spy = jest.fn();
            const connection = {
                connect: jest.fn(),
                synchronize: spy,
            };
            ORMManager.setManager(<any> {
                has: jest.fn(),
                get: jest.fn(),
                create: jest.fn().mockReturnValue(connection),
            });
            const manager = new ORMManager("default", {
                type: "sqlite",
                database: "",
            });
            await manager.synchronizeDatabaseConnection("force");
            expect(spy).toBeCalled();
        });

        it("should synchronizeDatabaseConnection passive", async () => {
            const spy = jest.fn();
            const connection = {
                connect: jest.fn(),
                synchronize: spy,
            };
            ORMManager.setManager(<any> {
                has: jest.fn(),
                get: jest.fn(),
                create: jest.fn().mockReturnValue(connection),
            });
            const manager = new ORMManager("default", {
                type: "sqlite",
                database: "",
            });
            await manager.synchronizeDatabaseConnection("passive");
            expect(spy).toBeCalled();
        });
    });
});
