import { dropDatabase, synchronizeDatabase, testDatabase } from "./Operations";

describe("Orm", () => {
    describe("Operations", () => {
        it("should dropDatabase drop database", () => {
            const spy = jest.fn();
            dropDatabase(jest.fn().mockImplementation(() => {
                return {
                    dropDatabaseConnection: spy,
                };
            }));
            expect(spy).toBeCalled();
        });

        it("should synchronizeDatabase create entities database", () => {
            const spy = jest.fn();
            synchronizeDatabase(jest.fn().mockImplementation(() => {
                return {
                    synchronizeDatabaseConnection: spy,
                };
            }));
            expect(spy).toBeCalled();
        });

        it("should testDatabase test database connection", () => {
            const spy = jest.fn();
            testDatabase(jest.fn().mockImplementation(() => {
                return {
                    testDatabaseConnection: spy,
                };
            }));
            expect(spy).toBeCalled();
        });
    });
});
