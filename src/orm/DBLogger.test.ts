import { DBLogger } from "./DBLogger";

describe("Orm", () => {
    describe("ORMLogger", () => {
        afterEach(() => {
            jest.resetModules();
        });

        it("should logMigration", () => {
            const spy = jest.fn();
            const logger = new DBLogger();
            logger.setLog(<any> {
                info: spy,
            });
            logger.logMigration("test");
            expect(spy).toBeCalled();
        });

        it("should logQuery", () => {
            const spy = jest.fn();
            const logger = new DBLogger();
            logger.setLog(<any> {
                debug: spy,
            });
            logger.logQuery("test");
            expect(spy).toBeCalled();
        });

        it("should logQueryError", () => {
            const spy = jest.fn();
            const logger = new DBLogger();
            logger.setLog(<any> {
                error: spy,
            });
            logger.logQueryError("test", "query");
            expect(spy).toBeCalled();
        });

        it("should logQuerySlow", () => {
            const spy = jest.fn();
            const logger = new DBLogger();
            logger.setLog(<any> {
                error: spy,
            });
            logger.logQuerySlow(10, "test");
            expect(spy).toBeCalled();
        });

        it("should logSchemaBuild", () => {
            const spy = jest.fn();
            const logger = new DBLogger();
            logger.setLog(<any> {
                info: spy,
            });
            logger.logSchemaBuild("test");
            expect(spy).toBeCalled();
        });

        it("should log", () => {
            const spy = jest.fn();
            const logger = new DBLogger();
            logger.setLog(<any> {
                log: spy,
            });
            logger.log("debug", "test");
            expect(spy).toBeCalled();
        });
    });
});
