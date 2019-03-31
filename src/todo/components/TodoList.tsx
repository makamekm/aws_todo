import { List } from "antd";
import * as moment from "moment";
import * as React from "react";
import { provider, useInstance } from "react-ioc";
import { withRouter } from "react-router";
import { useObservable } from "rxjs-hooks";
import { TodoService } from "../services/TodoService";
import { MutationErrors } from "./MutationErrors";
import { QueryErrors } from "./QueryErrors";
import { TodoInput } from "./TodoInput";
import { TodoItem } from "./TodoItem";

export const TodoList = withRouter((props: {
    children?: any;
    match?: any;
}) => {
    const todoService = useInstance(TodoService);
    React.useEffect(() => {
        const currentDate = moment();
        const year = props.match.params.year || currentDate.year();
        const month = props.match.params.month || (currentDate.month() + 1);
        const day = props.match.params.day || currentDate.date();
        todoService.date$.next(moment().year(year).month(month - 1).date(day));
    }, [1]);

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
