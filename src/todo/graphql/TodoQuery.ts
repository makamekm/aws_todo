import * as moment from "moment";
import { from } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import * as TypeQL from "typegql";
import { executeDB } from "../../orm";
import { TodoModel } from "../orm/Todo";
import { TodoStatsModel } from "../orm/TodoStats";

@TypeQL.ObjectType()
export class TodoQuery {
    @TypeQL.Field({ type: [TodoModel] })
    public async list(
        @TypeQL.Arg({type: TypeQL.Int}) year: number,
        @TypeQL.Arg({type: TypeQL.Int}) month: number,
        @TypeQL.Arg({type: TypeQL.Int}) day: number,
        @TypeQL.Context context,
    ): Promise<TodoModel[]> {
        const start = moment()
            .year(year)
            .month(month)
            .date(day)
            .hour(0)
            .minute(0)
            .second(0)
            .millisecond(0)
            .toDate();
        const end = moment()
            .year(year)
            .month(month)
            .date(day + 1)
            .hour(0)
            .minute(0)
            .second(0)
            .millisecond(0)
            .toDate();
        return await executeDB(
            (connection) => from(
                connection
                    .getMongoRepository(TodoModel)
                    .find({
                        order: {
                            date: "DESC",
                        },
                        where: {
                            userId: context.user.id,
                            date: {
                                $gte: start,
                                $lt: end,
                            },
                        },
                    }),
            ),
        );
    }

    @TypeQL.Field({ type: [TodoStatsModel] })
    public async stats(
        @TypeQL.Arg({type: TypeQL.Int}) year: number,
        @TypeQL.Arg({type: TypeQL.Int}) month: number,
        @TypeQL.Context context,
    ): Promise<TodoStatsModel[]> {
        return await Promise.all(
            Array.from(Array(60).keys())
            .map((i) => {
                const day = i - 15;
                const start = moment()
                    .year(year)
                    .month(month)
                    .date(day)
                    .hour(0)
                    .minute(0)
                    .second(0)
                    .millisecond(0)
                    .toDate();
                const end = moment()
                    .year(year)
                    .month(month)
                    .date(day + 1)
                    .hour(0)
                    .minute(0)
                    .second(0)
                    .millisecond(0)
                    .toDate();
                const middle = moment(
                        new Date(
                            (end.getTime() + start.getTime()) / 2,
                        ),
                    );
                return executeDB(
                    (connection) => from(
                        connection
                            .getMongoRepository(TodoModel)
                            .count({
                                userId: context.user.id,
                                date: {
                                    $gte: start,
                                    $lt: end,
                                },
                            }),
                    ).pipe(
                        switchMap((total) => from(
                            connection
                                .getMongoRepository(TodoModel)
                                .find({
                                    order: {
                                        date: "DESC",
                                    },
                                    where: {
                                        userId: context.user.id,
                                        date: {
                                            $gte: start,
                                            $lt: end,
                                        },
                                        isDone: false,
                                    },
                                }),
                            ).pipe(
                                map((unfinished) => {
                                    const stats = new TodoStatsModel();
                                    stats.total = total;
                                    stats.year = middle.year();
                                    stats.month = middle.month();
                                    stats.day = middle.date();
                                    stats.finished = total - unfinished.length;
                                    stats.unfinished = unfinished;
                                    return stats;
                                }),
                            ),
                        ),
                    ),
                );
            }),
        );
    }
}
