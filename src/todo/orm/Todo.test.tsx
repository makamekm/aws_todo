import {
    TodoModel,
} from "./Todo";

describe("Todo", () => {
    describe("Orm", () => {

        it("should Todo model match snapshot", async () => {
            const todo = new TodoModel();
            todo.date = new Date("1991/02/16");
            todo.id = 123;
            todo.isDone = true;
            todo.name = "test";
            todo.updated = new Date("1991/02/17");
            expect(todo).toMatchSnapshot();
        });
    });
});
