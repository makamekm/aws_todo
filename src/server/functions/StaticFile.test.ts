import {
    staticFile,
} from "./StaticFile";

describe("Server", () => {
    describe("Functions", () => {
        describe("StaticFile", () => {
            it("should read file", async () => {
                const response = await staticFile({
                    path: "/public/index.js",
                }, null, null, <any> {
                    existsSync: jest.fn().mockReturnValue(true),
                    readFileSync: jest.fn().mockReturnValue("body"),
                }, <any> {
                    lookup: jest.fn().mockReturnValue("text"),
                });
                expect(response.body).toBe("body");
                expect(response.headers["Content-Type"]).toBe("text");
                expect(response.statusCode).toBe(200);
            });

            it("should return 404", async () => {
                const response = await staticFile({
                    path: "/public/index.js",
                }, null, null, <any> {
                    existsSync: jest.fn().mockReturnValue(false),
                });
                expect(response.statusCode).toBe(404);
            });
        });
    });
});
