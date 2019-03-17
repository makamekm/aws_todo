import * as Todo from "../../todo/graphql";

const schemas: any[] = [
    ...Todo.getSchemas(),
];

export function getSchemas() {
    return schemas;
}
