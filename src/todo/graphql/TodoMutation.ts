import { GraphQLID } from "graphql/type";
import * as TypeQL from "typegql";
import { GetManager } from "../../orm";
import { TodoModel } from "../orm/Todo";

@TypeQL.ObjectType()
export class TodoMutation {
    @TypeQL.Field({ type: TodoModel })
    public async create(name: string): Promise<TodoModel> {
        if (name.length < 3) {
            throw Error("Name should be more than 3 chars");
        }

        const manager = GetManager();
        const connection = await manager.connect();
        const repository = connection.getRepository(TodoModel);

        const todo = new TodoModel();
        todo.name = name;
        todo.isDone = false;
        todo.date = new Date();

        await repository.save(todo);
        return todo;
    }

    @TypeQL.Field({ type: TodoModel })
    public async toggle(@TypeQL.Arg({ type: GraphQLID }) id: number): Promise<TodoModel> {
        const manager = GetManager();
        const connection = await manager.connect();
        const repository = connection.getRepository(TodoModel);

        const todo = await repository.findOne({
            id,
        });
        todo.isDone = !todo.isDone;

        await repository.save(todo);
        return todo;
    }

    @TypeQL.Field({ type: TodoModel })
    public async edit(@TypeQL.Arg({ type: GraphQLID }) id: number, name: string): Promise<TodoModel> {
        if (name.length < 3) {
            throw Error("Name should be more than 3 chars");
        }

        const manager = GetManager();
        const connection = await manager.connect();
        const repository = connection.getRepository(TodoModel);

        const todo = await repository.findOne({
            id,
        });
        todo.name = name;

        await repository.save(todo);
        return todo;
    }

    @TypeQL.Field({ type: TodoModel })
    public async delete(@TypeQL.Arg({ type: GraphQLID }) id: number): Promise<TodoModel> {
        const manager = GetManager();
        const connection = await manager.connect();
        const repository = connection.getRepository(TodoModel);

        const todo = await repository.findOne({
            id,
        });

        await repository.remove(todo);
        return todo;
    }
}
