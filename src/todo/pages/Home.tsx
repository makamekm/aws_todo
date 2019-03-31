import { PageHeader } from "antd";
import * as React from "react";
import { withRouter } from "react-router";
import { TodoList } from "../components/TodoList";

export const Home = withRouter(({history}) => {
    return <>
            <PageHeader
                onBack={() => {
                    history.push("/calendar");
                }}
                title="Back to Calendar"
            />
        <TodoList/>
    </>;
});
