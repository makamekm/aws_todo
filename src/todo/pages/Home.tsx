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
                subTitle="Back to Calendar"
            />
        <TodoList/>
    </>;
});
