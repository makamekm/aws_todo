import * as React from "react";
import {act, cleanup, fireEvent, waitForElement} from "react-testing-library";
import { getClient } from "../../test/Client";
import { fireEnter } from "../../test/Event";
import { getTodoService, renderAndWrapWithService } from "../test/TodoService";
import {
    TodoItem,
} from "./TodoItem";

describe("Todo", () => {
    describe("Components", () => {
        describe("TodoItem", () => {
            afterEach(cleanup);

            const getItemTodo = () => ({
                id: "test",
                name: "test",
                isDone: false,
            });

            const getData = (data = {
                id: "t1",
                name: "hello",
            }) => ({
                data: {
                    todoQuery: {
                        list: [
                            data,
                        ],
                    },
                },
            });

            it("should match snapshot", async () => {
                const html = await renderAndWrapWithService(
                    <TodoItem item={getItemTodo()}/>,
                );
                expect(html.container).toMatchSnapshot();
            });

            it("should call removeTodo", async () => {
                const expected = {
                    id: "t1",
                    name: "hello",
                };
                const service = getTodoService();
                let request;
                const client = getClient(getData(expected), (r) => {
                    request = r;
                });

                const html = await renderAndWrapWithService(
                    <TodoItem item={getItemTodo()}/>,
                    service,
                    client,
                );

                act(() => {
                    const btn = html.getByText(/remove/) as HTMLElement;
                    fireEvent.click(btn);
                });

                act(() => {
                    const btn = html.getByText(/OK/) as HTMLElement;
                    fireEvent.click(btn);
                });

                await waitForElement(() => service.data$.value);
                expect(request.query).toMatch(/DeleteTodo/);

                expect(service.data$.value[0]).toMatchObject(expected);
            });

            it("should call toggleTodo", async () => {
                const expected = {
                    id: "t1",
                    name: "hello",
                };
                const service = getTodoService();
                let request;
                const client = getClient(getData(expected), (r) => {
                    request = r;
                });

                const html = await renderAndWrapWithService(
                    <TodoItem item={getItemTodo()}/>,
                    service,
                    client,
                );

                act(() => {
                    const btn = html.getByText(/toggle/) as HTMLElement;
                    fireEvent.click(btn);
                });

                await waitForElement(() => service.data$.value);

                expect(request.query).toMatch(/ToggleTodo/);
                expect(service.data$.value[0]).toMatchObject(expected);
            });

            it("should call editTodo", async () => {
                const expected = {
                    id: "t1",
                    name: "hello",
                };
                const service = getTodoService();
                let request;
                const client = getClient(getData(expected), (r) => {
                    request = r;
                });

                const html = await renderAndWrapWithService(
                    <TodoItem item={getItemTodo()}/>,
                    service,
                    client,
                );

                act(() => {
                    const btn = html.getByRole(/button/) as HTMLElement;
                    fireEvent.click(btn);
                });

                act(() => {
                    const input = html.getByText(/test/) as HTMLInputElement;
                    fireEvent.focus(input);
                    fireEvent.change(input, { target: { value: "test test" } });
                    fireEnter(input);
                });

                await waitForElement(() => service.data$.value);

                expect(request.query).toMatch(/EditTodo/);
                expect(service.data$.value[0]).toMatchObject(expected);
            });
        });
    });
});
