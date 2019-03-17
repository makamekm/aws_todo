import * as TypeQL from "typegql";
import { GetManager } from "../../orm";
import { TodoModel } from "../orm/Todo";

@TypeQL.ObjectType()
export class TodoQuery {
    @TypeQL.Field({ type: [TodoModel] })
    public async list(): Promise<TodoModel[]> {
        const manager = GetManager();
        const connection = await manager.connect();
        const repository = connection.getRepository(TodoModel);

        const todoList = await repository.createQueryBuilder("equity")
            .orderBy("equity.date", "DESC")
            .getMany();

        return todoList;
    }
}
