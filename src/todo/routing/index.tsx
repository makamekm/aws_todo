import { AuthLayout } from "../../iso/layouts/AuthLayout";
import { TodoLayout } from "../layouts/TodoLayout";
import { CalendarPage } from "../pages/Calendar";
import { Home } from "../pages/Home";

const routes = [
    {
        component: AuthLayout,
        routes: [
            {
                component: TodoLayout,
                routes: [
                    {
                        component: CalendarPage,
                        path: "/calendar",
                        exact: true,
                    },
                    {
                        component: Home,
                        path: "/:year?/:month?/:day?",
                        exact: true,
                    },
                ],
            },
        ],
    },
];

export function getRoutes() {
    return routes;
}
