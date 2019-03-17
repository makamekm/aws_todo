import * as TypeQL from "typegql";
import { ORMRegistry, TypeORM } from "../../orm";

@ORMRegistry.RegisterEntity("TodoModel")
@TypeORM.Entity("todo")
@TypeQL.ObjectType()
export class TodoModel {
    @TypeORM.PrimaryGeneratedColumn()
    @TypeQL.Field()
    public id: number;

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
