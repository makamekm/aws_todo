import { mockGetManager, restoreGetManager } from "../../test/Manager";
import {
    TodoMutation,
} from "./TodoMutation";

describe("Todo", () => {
    describe("GraphQL", () => {
        describe("TodoMutation", () => {

            afterAll(() => {
                restoreGetManager();
            });

            it("should create", async () => {
                let expectedTodo;
                mockGetManager(() => ({
                    save: async (todo) => {
                        expectedTodo = todo;
                        return todo;
                    },
                }));
                const model = new TodoMutation();
                const result = await model.create("test");
                expect(expectedTodo.name).toBe("test");
                expect(expectedTodo).toMatchObject(result);
            });

            it("should edit", async () => {
                let modifiedTodo = {
                    name: "old test",
                };
                mockGetManager(() => ({
                    findOne: async () => modifiedTodo,
                    save: async (todo) => {
                        modifiedTodo = todo;
                        return todo;
                    },
                }));
                const model = new TodoMutation();
                const result = await model.edit(123, "test");
                expect(modifiedTodo.name).toBe("test");
                expect(modifiedTodo).toMatchObject(result);
            });

            it("should toggle", async () => {
                let modifiedTodo = {
                    name: "old test",
                    isDone: false,
                };
                mockGetManager(() => ({
                    findOne: async () => modifiedTodo,
                    save: async (todo) => {
                        modifiedTodo = todo;
                        return todo;
                    },
                }));
                const model = new TodoMutation();
                const result = await model.toggle(123);
                expect(modifiedTodo.isDone).toBeTruthy();
                expect(modifiedTodo).toMatchObject(result);
            });

            it("should delete", async () => {
                const todo = {
                    name: "old test",
                };
                const spy = jest.fn();
                mockGetManager(() => ({
                    findOne: async () => todo,
                    remove: spy,
                }));
                const model = new TodoMutation();
                const result = await model.delete(123);
                expect(spy).toBeCalled();
                expect(todo).toMatchObject(result);
            });
        });
    });
});
