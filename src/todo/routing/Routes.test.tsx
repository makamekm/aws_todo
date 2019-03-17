import {
    getRoutes,
} from "./";

describe("Todo", () => {
    describe("Routing", () => {

        it("should match snapshot", async () => {
            expect(getRoutes()).toMatchSnapshot();
        });
    });
});
