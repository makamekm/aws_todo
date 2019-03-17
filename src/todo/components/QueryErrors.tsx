import { Alert } from "antd";
import * as React from "react";
import { useInstance } from "react-ioc";
import { useObservable } from "rxjs-hooks";
import { TodoService } from "../services/TodoService";

export const QueryErrors = () => {
    const todoService = useInstance(TodoService);
    useObservable(() => todoService.queryErrors$);

    return (
        <>
            {todoService.queryErrors$.value.map((error, index) => (
                <Alert
                    style={{
                        marginBottom: 5,
                    }}
                    key={index}
                    message={error}
                    type="error"
                    showIcon
                    closable
                    afterClose={() => todoService.removeQueryError(index)}
                />
            ))}
        </>
    );
};
