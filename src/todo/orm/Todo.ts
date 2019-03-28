import * as TypeQL from "typegql";
import { DBRegistry, TypeORM } from "../../orm";

@DBRegistry.RegisterEntity("TodoModel")
@TypeORM.Entity("todo")
@TypeQL.ObjectType()
export class TodoModel {

    @TypeORM.ObjectIdColumn()
    @TypeQL.Field({ type: String })
    public id: TypeORM.ObjectID;

    @TypeORM.Column({
        length: 100,
        nullable: true,
    })
    @TypeORM.Index("todo-user-id-idx")
    @TypeQL.Field()
    public userId: string;

    @TypeORM.Column({
        length: 100,
        nullable: false,
    })
    @TypeORM.Index("todo-name-idx")
    @TypeQL.Field()
    public name: string;

    @TypeORM.Column({
        nullable: false,
    })
    @TypeORM.Index("todo-is-done-idx")
    @TypeQL.Field()
    public isDone: boolean;

    @TypeORM.CreateDateColumn()
    @TypeQL.Field({ type: String })
    public date: Date;

    @TypeORM.UpdateDateColumn()
    @TypeQL.Field({ type: String })
    public updated: Date;
}
