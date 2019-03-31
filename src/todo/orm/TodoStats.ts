import * as TypeQL from "typegql";
import { TodoModel } from "./Todo";

@TypeQL.ObjectType()
export class TodoStatsModel {

    @TypeQL.Field()
    public year: number;

    @TypeQL.Field()
    public month: number;

    @TypeQL.Field()
    public day: number;

    @TypeQL.Field()
    public finished: number;

    @TypeQL.Field()
    public total: number;

    @TypeQL.Field({
        type: [TodoModel],
    })
    public unfinished: TodoModel[];
}
