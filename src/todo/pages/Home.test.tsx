import { getInitialState } from "graphql-hooks-ssr";
import * as React from "react";
import {act, cleanup, fireEvent, render, RenderResult} from "react-testing-library";
import {getClient, renderAndWrapWithClient} from "../../test/Client";
import {
    Home,
} from "./Home";

describe("Todo", () => {
    describe("Pages", () => {
        describe("Home", () => {
            afterEach(cleanup);

            it("should match snapshot", async () => {
                const client = getClient({
                    data: {
                        todoQuery: {
                            list: [
                                {
                                    id: "t1",
                                    name: "todo1",
                                },
                                {
                                    id: "t2",
                                    name: "todo2",
                                },
                            ],
                        },
                    },
                });
                const html = await renderAndWrapWithClient(<Home/>, client);
                expect(html.container).toMatchSnapshot();
            });
        });
    });
});
