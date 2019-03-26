import { GraphQLID } from "graphql/type";
import { from, empty, of } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import * as TypeQL from "typegql";
import { executeDB } from "../../orm";
import { TodoModel } from "../orm/Todo";

@TypeQL.ObjectType()
export class TodoMutation {
    @TypeQL.Field({ type: TodoModel })
    public async create(name: string): Promise<TodoModel> {
        if (name.length < 3) {
            throw Error("Name should be more than 3 chars");
        }

        // of({
        //     name,
        // })
        // .pipe(

        // );

        return await executeDB(
            (connection) => from(
                [new TodoModel()],
            )
            .pipe(
                tap(
                    (todo) => {
                        todo.name = name;
                        todo.isDone = false;
                        todo.date = new Date();
                    },
                ),
                switchMap(
                    (todo) => connection
                        .getRepository(TodoModel)
                        .save(todo),
                ),
            ),
        );
    }

    @TypeQL.Field({ type: TodoModel })
    public async toggle(@TypeQL.Arg({ type: GraphQLID }) id: number): Promise<TodoModel> {
        return await executeDB(
            (connection) => from(
                connection
                    .getRepository(TodoModel)
                    .findOne({
                        id,
                    }),
            )
            .pipe(
                tap(
                    (todo) => todo.isDone = !todo.isDone,
                ),
                switchMap(
                    (todo) => connection
                        .getRepository(TodoModel)
                        .save(todo),
                ),
            ),
        );
    }

    @TypeQL.Field({ type: TodoModel })
    public async edit(@TypeQL.Arg({ type: GraphQLID }) id: number, name: string): Promise<TodoModel> {
        if (name.length < 3) {
            throw Error("Name should be more than 3 chars");
        }

        return await executeDB(
            (connection) => from(
                connection
                    .getRepository(TodoModel)
                    .findOne({
                        id,
                    }),
            )
            .pipe(
                tap(
                    (todo) => todo.name = name,
                ),
                switchMap(
                    (todo) => connection
                        .getRepository(TodoModel)
                        .save(todo),
                ),
            ),
        );
    }

    @TypeQL.Field({ type: TodoModel })
    public async delete(@TypeQL.Arg({ type: GraphQLID }) id: number): Promise<TodoModel> {
        return await executeDB(
            (connection) => from(
                connection
                    .getRepository(TodoModel)
                    .findOne({
                        id,
                    }),
            )
            .pipe(
                switchMap(
                    (todo) => connection
                        .getRepository(TodoModel)
                        .remove(todo),
                ),
            ),
        );
    }
}
