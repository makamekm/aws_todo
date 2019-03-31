// import * as React from "react";
// import * as renderer from "react-test-renderer";
// import {
//     Html,
// } from "./Html";

// describe("Server", () => {
//     describe("Render", () => {
//         describe("Application", () => {
//             it("should call render", async () => {
//                 const html = renderer.create(<Html
//                     markup={"markup"}
//                     store={{test: "store"}}
//                     state={{test: "state"}}
//                     styles={"styles"}
//                     helmet={{
//                         base: {
//                             toComponent: jest.fn().mockReturnValue("base"),
//                         },
//                         title: {
//                             toComponent: jest.fn().mockReturnValue("title"),
//                         },
//                         meta: {
//                             toComponent: jest.fn().mockReturnValue("meta"),
//                         },
//                         link: {
//                             toComponent: jest.fn().mockReturnValue("link"),
//                         },
//                         script: {
//                             toComponent: jest.fn().mockReturnValue("base"),
//                         },
//                     }}
//                     />);

//                 expect(html.toJSON()).toMatchSnapshot();
//             });
//         });
//     });
// });
