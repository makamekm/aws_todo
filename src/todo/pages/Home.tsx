import * as React from "react";
import { TodoList } from "../components/TodoList";

export const Home = () => {
    return (
        <div style={{
            paddingTop: "10px",
        }}>
            <TodoList/>
        </div>
    );
};
