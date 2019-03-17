import { List } from "antd";
import * as React from "react";
import { provider, useInstance } from "react-ioc";
import { useObservable } from "rxjs-hooks";
import { TodoService } from "../services/TodoService";
import { MutationErrors } from "./MutationErrors";
import { QueryErrors } from "./QueryErrors";
import { TodoInput } from "./TodoInput";
import { TodoItem } from "./TodoItem";

export const TodoList = provider(TodoService)((props: {
    children?: any;
}) => {
    const todoService = useInstance(TodoService);
    const { loading } = todoService.useDataService();
    useObservable(() => todoService.data$);

    return (
        <>
            {props.children}
            <MutationErrors/>
            <QueryErrors/>
            <List
                size="small"
                loading={loading}
                header={
                    <TodoInput/>
                }
                bordered
                dataSource={todoService.data$.value || []}
                renderItem={(item) => (
                    <TodoItem item={item} key={item.id}/>
                )}
            />
        </>
    );
});
