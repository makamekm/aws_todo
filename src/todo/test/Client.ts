import { getClient } from "../../test/Client";

export const getClientTodo = () => {
    return getClient({
        data: {
            todoQuery: {
                list: [
                    {
                        id: "t1",
                        name: "todo1",
                    },
                    {
                        id: "t2",
                        name: "todo2",
                    },
                ],
            },
        },
    });
};
