import * as React from "react";
import { inject } from "react-ioc";
import {cleanup} from "react-testing-library";
import {renderAndWrapWithClient} from "../../test/Client";
import { TodoService } from "../services/TodoService";
import { getClientTodo } from "../test/Client";
import {
    TodoList,
} from "./TodoList";

describe("Todo", () => {
    describe("Components", () => {
        describe("TodoList", () => {
            afterEach(cleanup);

            it("should match snapshot", async () => {
                const client = getClientTodo();
                const html = await renderAndWrapWithClient(
                    <TodoList/>,
                    client,
                );
                expect(html.container).toMatchSnapshot();
            });

            it("should ServiceTodo exist", async () => {
                const client = getClientTodo();
                const isTodoServiceExist = jest.fn();
                class TodoServiceCheck extends React.PureComponent<{}> {
                    @inject private todoService: TodoService;

                    public render() {
                        if (this.todoService) {
                            isTodoServiceExist();
                        }

                        return (
                            <div/>
                        );
                    }
                }
                await renderAndWrapWithClient(
                    <TodoList>
                        <TodoServiceCheck/>
                    </TodoList>,
                    client,
                );
                expect(isTodoServiceExist).toBeCalled();
            });
        });
    });
});
