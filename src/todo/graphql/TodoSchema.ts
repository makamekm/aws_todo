import * as TypeQL from "typegql";
import { TodoMutation } from "./TodoMutation";
import { TodoQuery } from "./TodoQuery";

@TypeQL.SchemaRoot()
export class TodoSchema {
    @TypeQL.Query()
    @TypeQL.Mutation()
    public todoQuery(
        @TypeQL.Context context,
    ): TodoQuery {
        if (!context.user) {
            throw new Error("You are not authorized");
        }

        return new TodoQuery();
    }

    @TypeQL.Mutation()
    public todoMutation(
        @TypeQL.Context context,
    ): TodoMutation {
        if (!context.user) {
            throw new Error("You are not authorized");
        }

        return new TodoMutation();
    }
}
