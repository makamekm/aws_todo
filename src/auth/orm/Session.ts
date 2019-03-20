import { ORMRegistry, TypeORM } from "../../orm";
import { UserModel } from "./User";

export enum SessionProvider {
    Google = 0,
}

@ORMRegistry.RegisterEntity("SessionModel")
@TypeORM.Entity("session")
export class SessionModel {
    @TypeORM.PrimaryGeneratedColumn()
    public id: number;

    @TypeORM.ManyToOne(() => UserModel, {
        cascade: true,
    })
    public userId: UserModel;

    @TypeORM.CreateDateColumn()
    public date: Date;

    @TypeORM.UpdateDateColumn()
    public updated: Date;
}
