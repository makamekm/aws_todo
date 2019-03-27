import { AuthLayout } from "../../iso/layouts/AuthLayout";
import { CalendarPage } from "../pages/Calendar";
import { Home } from "../pages/Home";

const routes = [
    {
        component: AuthLayout,
        routes: [
            {
                component: Home,
                path: "/",
                exact: true,
            },
            {
                component: CalendarPage,
                path: "/calendar",
                exact: true,
            },
        ],
    },
];

export function getRoutes() {
    return routes;
}
