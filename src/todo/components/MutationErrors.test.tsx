import * as React from "react";
import {cleanup} from "react-testing-library";
import { getTodoService, renderAndWrapWithService } from "../test/TodoService";
import {
    MutationErrors,
} from "./MutationErrors";

describe("Todo", () => {
    describe("Components", () => {
        describe("MutationErrors", () => {
            afterEach(cleanup);

            it("should match snapshot", async () => {
                const service = getTodoService();
                service.mutationError$.next("test");
                const html = await renderAndWrapWithService(
                    <MutationErrors/>,
                    service,
                );
                expect(html.container).toMatchSnapshot();
            });
        });
    });
});
