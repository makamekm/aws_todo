import { GraphQLID } from "graphql/type";
import { from } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import * as TypeQL from "typegql";
import { executeDB } from "../../orm";
import { TodoModel } from "../orm/Todo";

@TypeQL.ObjectType()
export class TodoMutation {
    @TypeQL.Field({ type: TodoModel })
    public async create(
        name: string,
        @TypeQL.Arg({type: TypeQL.Int}) year: number,
        @TypeQL.Arg({type: TypeQL.Int}) month: number,
        @TypeQL.Arg({type: TypeQL.Int}) day: number,
        @TypeQL.Context context,
    ): Promise<TodoModel> {
        if (name.length < 3) {
            throw Error("Name should be more than 3 chars");
        }

        const start = new Date(year, month + 1, day);
        const end = new Date(year, month + 1, day + 1);

        const count = await executeDB(
            (connection) => from(
                connection
                    .getMongoRepository(TodoModel)
                    .count({
                        userId: context.user.id,
                        date: {
                            $gte: start,
                            $lt: end,
                        },
                    }),
            ),
        );

        if (count > 15) {
            throw Error("You can make only 15 todos per day");
        }

        const currentDate = new Date();
        const date = new Date(
            year,
            month + 1,
            day,
            currentDate.getHours(),
            currentDate.getMinutes(),
            currentDate.getSeconds(),
            currentDate.getMilliseconds(),
        );

        return await executeDB(
            (connection) => from(
                [new TodoModel()],
            )
            .pipe(
                tap(
                    (todo) => {
                        todo.name = name;
                        todo.isDone = false;
                        todo.date = date;
                        todo.created = new Date();
                        todo.userId = context.user.id;
                    },
                ),
                switchMap(
                    (todo) => connection
                        .getMongoRepository(TodoModel)
                        .save(todo),
                ),
            ),
        );
    }

    @TypeQL.Field({ type: TodoModel })
    public async toggle(
        @TypeQL.Arg({ type: GraphQLID }) id: string,
        @TypeQL.Context context,
    ): Promise<TodoModel> {
        return await executeDB(
            (connection) => from(
                connection
                    .getMongoRepository(TodoModel)
                    .findOne(id),
            )
            .pipe(
                tap(
                    (todo) => {
                        if (todo.userId !== context.user.id) {
                            throw Error("the task is not yours");
                        }
                    },
                ),
                tap(
                    (todo) => todo.isDone = !todo.isDone,
                ),
                switchMap(
                    (todo) => connection
                        .getMongoRepository(TodoModel)
                        .save(todo),
                ),
            ),
        );
    }

    @TypeQL.Field({ type: TodoModel })
    public async edit(
        @TypeQL.Arg({ type: GraphQLID }) id: string,
        name: string,
        @TypeQL.Context context,
    ): Promise<TodoModel> {
        if (name.length < 3) {
            throw Error("Name should be more than 3 chars");
        }

        return await executeDB(
            (connection) => from(
                connection
                    .getMongoRepository(TodoModel)
                    .findOne(id),
            )
            .pipe(
                tap(
                    (todo) => {
                        if (todo.userId !== context.user.id) {
                            throw Error("the task is not yours");
                        }
                    },
                ),
                tap(
                    (todo) => todo.name = name,
                ),
                switchMap(
                    (todo) => connection
                        .getMongoRepository(TodoModel)
                        .save(todo),
                ),
            ),
        );
    }

    @TypeQL.Field({ type: TodoModel })
    public async delete(
        @TypeQL.Arg({ type: GraphQLID }) id: string,
        @TypeQL.Context context,
    ): Promise<TodoModel> {
        return await executeDB(
            (connection) => from(
                connection
                    .getMongoRepository(TodoModel)
                    .findOne(id),
            )
            .pipe(
                tap(
                    (todo) => {
                        if (todo.userId !== context.user.id) {
                            throw Error("the task is not yours");
                        }
                    },
                ),
                switchMap(
                    (todo) => connection
                        .getMongoRepository(TodoModel)
                        .remove(todo),
                ),
            ),
        );
    }
}
