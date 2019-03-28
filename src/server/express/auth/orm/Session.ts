import { DBRegistry, TypeORM } from "../../../../orm";

export enum SessionProvider {
    Google = 0,
}

@DBRegistry.RegisterEntity("SessionModel")
@TypeORM.Entity("session")
export class SessionModel {

    @TypeORM.ObjectIdColumn()
    public id: TypeORM.ObjectID;

    @TypeORM.Column({
        length: 100,
        nullable: false,
        unique: true,
    })
    public sid: string;

    @TypeORM.Column({
        length: 500,
        nullable: false,
    })
    public data: string;

    @TypeORM.CreateDateColumn()
    public date: Date;

    @TypeORM.UpdateDateColumn()
    public updated: Date;
}
