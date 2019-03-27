import * as Todo from "../../todo/routing";
import { MainLayout } from "../layouts/MainLayout";

const routes = [
    {
        component: MainLayout,
        routes: [
            ...Todo.getRoutes(),
        ],
    },
];

export function getRoutes() {
    return routes;
}
