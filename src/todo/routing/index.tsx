import { Home } from "../pages/Home";

const routes = [
    {
        component: Home,
        exact: true,
        path: "/",
    },
    {
        component: Home,
        path: "/index",
    },
];

export function getRoutes() {
    return routes;
}
