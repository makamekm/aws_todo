import { useMutation, useQuery } from "graphql-hooks";
import * as React from "react";
import { BehaviorSubject, from, Subject } from "rxjs";
import { map, tap, toArray } from "rxjs/operators";

export const QUERY_TODO_LIST = `{
    todoQuery {
        list {
            id
            name
            isDone
            date
            updated
        }
    }
}`;

export const MUTATION_TODO_CREATE = `mutation CreateTodo($name: String!) {
    todoMutation {
        create(name: $name) {
            id
            name
            isDone
            date
            updated
        }
    }
    todoQuery {
        list {
            id
            name
            isDone
            date
            updated
        }
    }
}`;

export const MUTATION_TODO_DELETE = `mutation DeleteTodo($id: ID!) {
    todoMutation {
        delete(id: $id) {
            id
            name
            isDone
            date
            updated
        }
    }
    todoQuery {
        list {
            id
            name
            isDone
            date
            updated
        }
    }
}`;

export const MUTATION_TODO_TOGGLE = `mutation ToggleTodo($id: ID!) {
    todoMutation {
        toggle(id: $id) {
            id
            name
            isDone
            date
            updated
        }
    }
    todoQuery {
        list {
            id
            name
            isDone
            date
            updated
        }
    }
}`;

export const MUTATION_TODO_EDIT = `mutation EditTodo($id: ID!, $name: String!) {
    todoMutation {
        edit(id: $id, name: $name) {
            id
            name
            isDone
            date
            updated
        }
    }
    todoQuery {
        list {
            id
            name
            isDone
            date
            updated
        }
    }
}`;

export interface ITodo {
    id: number;
    name: string;
    isDone: boolean;
    date: string;
    updated: string;
}

export class TodoService {
    public searchString$ = new BehaviorSubject("");
    public data$: BehaviorSubject<ITodo[]> = new BehaviorSubject(null);
    public mutationError$: Subject<string> = new Subject();
    public queryErrors$: BehaviorSubject<string[]> = new BehaviorSubject([]);

    public useDataService = () => {
        const response = useQuery(QUERY_TODO_LIST);
        const { data: queryData, loading, refetch, error } = response;
        const list = queryData && queryData.todoQuery && queryData.todoQuery.list;

        if (error) {
            this.pipeQueryErrors(response);
        }

        if (!this.data$.value && list) {
            this.data$.next(list);
        }

        React.useEffect(() => {
            if (list) {
                this.data$.next(list);
            }
        }, [list]);

        return {
            refetch,
            loading,
        };
    }

    public useItemService = (item) => {
        const [deleteTodo, { loading: deleteTodoLoading }] = useMutation(MUTATION_TODO_DELETE);
        const [toggleTodo, { loading: toggleTodoLoading }] = useMutation(MUTATION_TODO_TOGGLE);
        const [editTodo, { loading: editTodoLoading }] = useMutation(MUTATION_TODO_EDIT);

        return {
            loading: deleteTodoLoading || toggleTodoLoading || editTodoLoading,
            deleteTodo: () => this.deleteTodo(deleteTodo, item.id),
            toggleTodo: () => this.toggleTodo(toggleTodo, item.id),
            editTodo: (name) => this.editTodo(editTodo, item.id, name),
        };
    }

    public useCreateService = () => {
        const [createTodo, { loading: createTodoLoading }] = useMutation(MUTATION_TODO_CREATE);

        return {
            loading: createTodoLoading,
            createTodo: () => this.createTodo(createTodo, this.searchString$.value),
        };
    }

    public removeQueryError(index: number) {
        const list = Array.from(this.queryErrors$.value);
        list.splice(index, 1);
        this.queryErrors$.next(list);
    }

    private pipeMutationErrors(response) {
        from(response.graphQLErrors).pipe(
            map((error: any) => error.message),
            tap((error: string) => this.mutationError$.next(error)),
        ).subscribe();
    }

    private pipeQueryErrors(response) {
        from(response.graphQLErrors).pipe(
            map((error: any) => error.message),
            toArray(),
            tap((errors: string[]) => this.queryErrors$.next(errors)),
        ).subscribe();
    }

    private async createTodo(createTodo, name) {
        const result = await createTodo({ variables: { name } });
        if (!result.error) {
            this.data$.next(result.data.todoQuery.list);
            this.searchString$.next("");
        } else {
            this.pipeMutationErrors(result);
        }
    }

    private async deleteTodo(deleteTodo, id) {
        const result = await deleteTodo({ variables: { id } });
        if (!result.error) {
            this.data$.next(result.data.todoQuery.list);
            this.searchString$.next("");
        } else {
            this.pipeMutationErrors(result);
        }
    }

    private async editTodo(editTodo, id, name) {
        const result = await editTodo({ variables: { id, name } });
        if (!result.error) {
            this.data$.next(result.data.todoQuery.list);
            this.searchString$.next("");
        } else {
            this.pipeMutationErrors(result);
        }
    }

    private async toggleTodo(toggleTodo, id) {
        const result = await toggleTodo({ variables: { id } });
        if (!result.error) {
            this.data$.next(result.data.todoQuery.list);
            this.searchString$.next("");
        } else {
            this.pipeMutationErrors(result);
        }
    }
}
