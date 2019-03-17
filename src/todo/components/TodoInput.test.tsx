import * as React from "react";
import {act, cleanup, fireEvent, waitForElement} from "react-testing-library";
import { getClient } from "../../test/Client";
import { fireEnter } from "../../test/Event";
import { getTodoService, renderAndWrapWithService } from "../test/TodoService";
import {
    TodoInput,
} from "./TodoInput";

describe("Todo", () => {
    describe("Components", () => {
        describe("TodoInput", () => {
            afterEach(cleanup);

            it("should match snapshot", async () => {
                const service = getTodoService();
                service.searchString$.next("test");
                const html = await renderAndWrapWithService(
                    <TodoInput/>,
                    service,
                );
                expect(html).toMatchSnapshot();
            });

            it("should change model", async () => {
                const service = getTodoService();
                service.searchString$.next("test");
                const html = await renderAndWrapWithService(
                    <TodoInput/>,
                    service,
                );
                act(() => {
                    const input = html.getByValue(/test/i) as HTMLInputElement;
                    fireEvent.change(input, { target: { value: "hello" } });
                });
                expect(service.searchString$.value).toBe("hello");
            });

            it("should call createTodo", async () => {
                const expected = {
                    id: "t1",
                    name: "hello",
                };
                const service = getTodoService();
                let request;
                const client = getClient({
                    data: {
                        todoQuery: {
                            list: [
                                {
                                    id: "t1",
                                    name: "hello",
                                },
                            ],
                        },
                    },
                }, (r) => {
                    request = r;
                });

                service.searchString$.next("test");
                const html = await renderAndWrapWithService(
                    <TodoInput/>,
                    service,
                    client,
                );

                act(() => {
                    const input = html.getByValue(/test/i) as HTMLInputElement;
                    fireEvent.change(input, { target: { value: "hello" } });
                    fireEnter(input);
                });

                await waitForElement(() => service.searchString$.value === "" || undefined);

                expect(request.query).toMatch(/CreateTodo/);
                expect(service.searchString$.value).toBe("");
                expect(service.data$.value[0]).toMatchObject(expected);
            });
        });
    });
});
