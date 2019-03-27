import { Badge, Calendar } from "antd";
import * as React from "react";

function getListData(value) {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: "warning", content: "This is warning event." },
                { type: "success", content: "This is usual event." }
            ];
            break;
        case 10:
            listData = [
                { type: "warning", content: "This is warning event." },
                { type: "success", content: "This is usual event." },
                { type: "error", content: "This is error event." }
            ];
            break;
        case 15:
            listData = [
                { type: "warning", content: "This is warning event" },
                {
                    type: "success",
                    content: "This is very long usual event。。....",
                },
                { type: "error", content: "This is error event 1." },
                { type: "error", content: "This is error event 2." },
                { type: "error", content: "This is error event 3." },
                { type: "error", content: "This is error event 4." }
            ];
            break;
        default:
    }
    return listData || [];
}

function dateCellRender(value) {
    const listData = getListData(value);
    return (
        <>
            {listData.map((item) => (
                <React.Fragment key={item.content}>
                    <Badge status={item.type} text={item.content} />
                </React.Fragment>
            ))}
        </>
    );
}

export const CalendarPage = () => {
    const [mode, setMode] = React.useState<any>("month");
    return (
        <div>
            <Calendar
                mode={mode}
                onPanelChange={(_, newMode) => setMode(newMode)}
                onSelect={(date) => console.log(date)}
                dateCellRender={dateCellRender} />
        </div>
    );
};
