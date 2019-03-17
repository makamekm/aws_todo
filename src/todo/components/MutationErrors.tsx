import { message } from "antd";
import { useInstance } from "react-ioc";
import { useObservable } from "rxjs-hooks";
import { tap } from "rxjs/operators";
import { TodoService } from "../services/TodoService";

export const MutationErrors = () => {
    const todoService = useInstance(TodoService);
    useObservable(() => todoService.mutationError$.pipe(
        tap((error) => {
            message.error(error);
        }),
    ));

    return null;
};
