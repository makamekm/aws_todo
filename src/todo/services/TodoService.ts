import { useMutation, useQuery } from "graphql-hooks";
import * as moment from "moment";
import * as React from "react";
import { inject } from "react-ioc";
import { BehaviorSubject, from, Subject } from "rxjs";
import { useObservable } from "rxjs-hooks";
import { map, switchMap, tap, toArray } from "rxjs/operators";
import { StoreService } from "../../iso/services/StoreService";

export const QUERY_TODO_LIST = `query ListTodo($year: Int!, $month: Int!, $day: Int!) {
    todoQuery {
        list(
            year: $year,
            month: $month,
            day: $day,
        ) {
            id
            name
            isDone
            date
            updated
        }
    }
}`;
export const QUERY_TODO_STATS = `query StatsTodo($year: Int!, $month: Int!) {
    todoQuery {
        stats(
            year: $year,
            month: $month,
        ) {
            year
            month
            day
            finished
            total
            unfinished {
                id
                name
                isDone
            }
        }
    }
}`;

export const MUTATION_TODO_CREATE = `mutation CreateTodo(
        $year: Int!,
        $month: Int!,
        $day: Int!,
        $name: String!
    ) {
    todoMutation {
        create(
            year: $year,
            month: $month,
            day: $day,
            name: $name,
        ) {
            id
            name
            isDone
            date
            updated
        }
    }
    todoQuery {
        list(
            year: $year,
            month: $month,
            day: $day,
        ) {
            id
            name
            isDone
            date
            updated
        }
    }
}`;

export const MUTATION_TODO_DELETE = `mutation DeleteTodo(
        $id: ID!,
        $year: Int!,
        $month: Int!,
        $day: Int!,
    ) {
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
        list(
            year: $year,
            month: $month,
            day: $day,
        ) {
            id
            name
            isDone
            date
            updated
        }
    }
}`;

export const MUTATION_TODO_TOGGLE = `mutation ToggleTodo(
    $id: ID!,
    $year: Int!,
    $month: Int!,
    $day: Int!,
) {
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
        list(
            year: $year,
            month: $month,
            day: $day,
        ) {
            id
            name
            isDone
            date
            updated
        }
    }
}`;

export const MUTATION_TODO_EDIT = `mutation EditTodo(
        $id: ID!,
        $name: String!,
        $year: Int!,
        $month: Int!,
        $day: Int!,
    ) {
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
        list(
            year: $year,
            month: $month,
            day: $day,
        ) {
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
    @inject public storeService: StoreService;
    public searchString$ = new BehaviorSubject("");
    public data$: BehaviorSubject<ITodo[]> = new BehaviorSubject(null);
    public mutationError$: Subject<string> = new Subject();
    public queryErrors$: BehaviorSubject<string[]> = new BehaviorSubject([]);
    public date$ = new BehaviorSubject(moment(this.storeService.date));

    public findStats(stats, year, month, day) {
        return stats && stats.find((s) => s.year === year && s.month === month && s.day === day);
    }

    public useStatsService = () => {
        const response = useQuery(QUERY_TODO_STATS, {
            variables: {
                year: this.date$.value.year(),
                month: this.date$.value.month(),
            },
        });
        const { data: queryData, loading, refetch, error } = response;
        const stats = queryData && queryData.todoQuery && queryData.todoQuery.stats;
        useObservable(() => this.date$.pipe(
            switchMap(refetch),
        ));

        if (error) {
            this.pipeQueryErrors(response);
        }

        return {
            stats,
            loading,
            refetch,
            getStats: (date) => this.findStats(
                stats,
                date.year(),
                date.month(),
                date.date(),
            ),
        };
    }

    public useDataService = () => {
        const response = useQuery(QUERY_TODO_LIST, {
            variables: {
                year: this.date$.value.year(),
                month: this.date$.value.month(),
                day: this.date$.value.date(),
            },
        });
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
        const result = await createTodo({
            variables: {
                name,
                year: this.date$.value.year(),
                month: this.date$.value.month(),
                day: this.date$.value.date(),
            },
        });
        if (!result.error) {
            this.data$.next(result.data.todoQuery.list);
            this.searchString$.next("");
        } else {
            this.pipeMutationErrors(result);
        }
    }

    private async deleteTodo(deleteTodo, id) {
        const result = await deleteTodo({
            variables: {
                id,
                year: this.date$.value.year(),
                month: this.date$.value.month(),
                day: this.date$.value.date(),
            },
        });
        if (!result.error) {
            this.data$.next(result.data.todoQuery.list);
            this.searchString$.next("");
        } else {
            this.pipeMutationErrors(result);
        }
    }

    private async editTodo(editTodo, id, name) {
        const result = await editTodo({
            variables: {
                id,
                name,
                year: this.date$.value.year(),
                month: this.date$.value.month(),
                day: this.date$.value.date(),
            },
        });
        if (!result.error) {
            this.data$.next(result.data.todoQuery.list);
            this.searchString$.next("");
        } else {
            this.pipeMutationErrors(result);
        }
    }

    private async toggleTodo(toggleTodo, id) {
        const result = await toggleTodo({
            variables: {
                id,
                year: this.date$.value.year(),
                month: this.date$.value.month(),
                day: this.date$.value.date(),
            },
        });
        if (!result.error) {
            this.data$.next(result.data.todoQuery.list);
            this.searchString$.next("");
        } else {
            this.pipeMutationErrors(result);
        }
    }
}
