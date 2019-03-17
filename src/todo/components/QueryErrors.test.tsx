import * as React from "react";
import {cleanup} from "react-testing-library";
import { getTodoService, renderAndWrapWithService } from "../test/TodoService";
import {
    QueryErrors,
} from "./QueryErrors";

describe("Todo", () => {
    describe("Components", () => {
        describe("QueryErrors", () => {
            afterEach(cleanup);

            it("should match snapshot", async () => {
                const service = getTodoService();
                service.queryErrors$.next(["test1", "test2"]);
                const html = await renderAndWrapWithService(
                    <QueryErrors/>,
                    service,
                );
                expect(html.container).toMatchSnapshot();
            });
        });
    });
});
