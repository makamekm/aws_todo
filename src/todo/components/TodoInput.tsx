import { Input, Spin } from "antd";
import * as React from "react";
import { useInstance } from "react-ioc";
import { useEventCallback, useObservable } from "rxjs-hooks";
import { filter, map, switchMap } from "rxjs/operators";
import { TodoService } from "../services/TodoService";

export const TodoInput = () => {
    const { searchString$, useCreateService } = useInstance(TodoService);
    const { createTodo, loading } = useCreateService();
    const value = useObservable(() => searchString$);
    const [inputCallback] = useEventCallback<React.ChangeEvent<HTMLInputElement>>(
        (event$) => event$.pipe(
            map((event) => event && event.currentTarget.value || ""),
            map((str) => searchString$.next(str)),
        ),
    );

    return (
        <Spin spinning={loading}>
            <Input
                disabled={loading}
                placeholder="Here is your today's todo list"
                value={value}
                onChange={inputCallback}
                onPressEnter={createTodo}/>
        </Spin>
    );
};
