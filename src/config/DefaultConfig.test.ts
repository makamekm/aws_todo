import config from "./DefaultConfig";

describe("Config", () => {
    describe("DefaultConfig", () => {
        it("should match snapshot", () => {
            expect(config).toMatchSnapshot();
        });
    });
});
