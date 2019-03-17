import * as TypeQL from "typegql";
import { TodoMutation } from "./TodoMutation";
import { TodoQuery } from "./TodoQuery";

@TypeQL.Schema()
export class TodoSchema {
    @TypeQL.Query()
    @TypeQL.Mutation()
    public todoQuery(): TodoQuery {
        return new TodoQuery();
    }

    @TypeQL.Mutation()
    public todoMutation(): TodoMutation {
        return new TodoMutation();
    }
}
