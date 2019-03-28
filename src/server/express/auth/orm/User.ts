import * as TypeQL from "typegql";
import { DBRegistry, TypeORM } from "../../../../orm";

export enum UserProvider {
    Google = 0,
}

@DBRegistry.RegisterEntity("SessionModel")
@TypeORM.Entity("session")
@TypeQL.ObjectType()
export class UserModel {

    @TypeORM.ObjectIdColumn()
    @TypeQL.Field()
    public id: TypeORM.ObjectID;

    @TypeORM.Column({
        length: 100,
        nullable: false,
    })
    @TypeORM.Index("user-google-id-idx")
    @TypeQL.Field()
    public googleId: string;

    @TypeORM.Column({
        length: 100,
        nullable: false,
    })
    @TypeORM.Index("user-name-idx")
    @TypeQL.Field()
    public name: string;

    @TypeORM.Column({
        length: 100,
        nullable: false,
    })
    @TypeQL.Field()
    public avatar: string;

    @TypeORM.Column({
        length: 100,
        nullable: false,
    })
    @TypeORM.Index("user-provider-idx")
    @TypeQL.Field()
    public type: UserProvider;

    @TypeORM.CreateDateColumn()
    @TypeQL.Field({ type: String })
    public date: Date;

    @TypeORM.UpdateDateColumn()
    @TypeQL.Field({ type: String })
    public updated: Date;
}
