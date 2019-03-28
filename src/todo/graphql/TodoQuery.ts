import { from } from "rxjs";
import * as TypeQL from "typegql";
import { executeDB } from "../../orm";
import { TodoModel } from "../orm/Todo";

@TypeQL.ObjectType()
export class TodoQuery {
    @TypeQL.Field({ type: [TodoModel] })
    public async list(@TypeQL.Context context): Promise<TodoModel[]> {
        return await executeDB(
            (connection) => from(
                connection
                    .getMongoRepository(TodoModel)
                    .createQueryBuilder("equity")
                    .orderBy("equity.date", "DESC")
                    .getMany(),
            ),
        );
    }
}
