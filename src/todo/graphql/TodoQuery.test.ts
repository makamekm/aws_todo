// import { mockGetManager, restoreGetManager } from "../../test/Manager";
// import {
//     TodoQuery,
// } from "./TodoQuery";

// describe("Todo", () => {
//     describe("GraphQL", () => {
//         describe("TodoQuery", () => {

//             afterAll(() => {
//                 restoreGetManager();
//             });

//             it("should return list", async () => {
//                 const expected = [
//                     {
//                         test: "test",
//                     },
//                 ];
//                 mockGetManager((obj) => ({
//                     orderBy: () => obj,
//                     getMany: jest.fn().mockResolvedValue(expected),
//                 }));
//                 const model = new TodoQuery();
//                 const result = await model.list();
//                 expect(result).toMatchObject(expected);
//             });
//         });
//     });
// });
