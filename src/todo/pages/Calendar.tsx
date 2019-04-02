import { Badge, Button, Calendar, PageHeader, Spin } from "antd";
import * as moment from "moment";
import * as React from "react";
import { useInstance } from "react-ioc";
import { withRouter } from "react-router";
import { QueryErrors } from "../components/QueryErrors";
import { TodoService } from "../services/TodoService";

const dateCellRender = (getStats) => (value) => {
    const today = moment();
    const isToday = value.date() === today.date() && value.month() === today.month() && value.year() === today.year();
    const data = getStats(value);
    const unfinished: any[] = data ? data.unfinished : [];
    return (
        <>
            {data && data.total > 0 && <div>
                <Badge
                    status={data.total === data.finished ? "success" : isToday ? "processing" : "default"}
                    text={`${data.finished}/${data.total}`}/>
            </div>}
            {unfinished.slice(0, 3).map((item) => (
                <div key={item.id}>
                    <Badge status={"error"} text={item.name} />
                </div>
            ))}
        </>
    );
};

export const CalendarPage = withRouter(({history}) => {
    const [mode, setMode] = React.useState<any>("month");
    const todoService = useInstance(TodoService);
    const { getStats, loading } = todoService.useStatsService();

    return (
        <>
            <PageHeader
                title="Calendar"
                extra={<div>
                    <Button type="dashed">
                        Logout
                    </Button>
                </div>}
            />
            <QueryErrors/>
            <Spin spinning={loading}>
                <Calendar
                    disabledDate={() => loading}
                    value={todoService.date$.value}
                    mode={mode}
                    onPanelChange={(date, newMode) => {
                        setMode(newMode);
                        todoService.date$.next(date);
                    }}
                    onSelect={(date) => {
                        history.push(date.format("/YYYY/MM/DD"));
                    }}
                    dateCellRender={dateCellRender(getStats)} />
            </Spin>
        </>
    );
});
