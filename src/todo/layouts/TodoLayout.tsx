import * as React from "react";
import { provider } from "react-ioc";
import { withRouter } from "react-router";
import { renderRoutes } from "react-router-config";
import { TodoService } from "../services/TodoService";

export const TodoServiceProvider = provider(TodoService)((props) => {
    return <>
            {props.children}
        </>;
});

export const TodoLayout = withRouter((props) => {
    return <TodoServiceProvider>
            {renderRoutes(props.route.routes)}
        </TodoServiceProvider>;
});
