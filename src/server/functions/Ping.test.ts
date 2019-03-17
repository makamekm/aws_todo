import {
    ping,
} from "./Ping";

describe("Server", () => {
    describe("Functions", () => {
        describe("Ping", () => {
            it("should return 404", async () => {
                const response = await ping(null, null);
                expect(response.statusCode).toBe(200);
            });
        });
    });
});
