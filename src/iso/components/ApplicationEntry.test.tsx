// import * as React from "react";
// import { inject } from "react-ioc";
// import {cleanup} from "react-testing-library";
// import {getClient, renderWithClient} from "../../test/Client";
// import { ProviderService } from "../services/ProviderService";
// import { StoreService } from "../services/StoreService";
// import {
//     ApplicationEntry,
// } from "./ApplicationEntry";

// describe("Iso", () => {
//     describe("Components", () => {
//         describe("ApplicationEntry", () => {
//             afterEach(cleanup);

//             it("should call match snapshot", async () => {
//                 const client = getClient({});
//                 const app = <ApplicationEntry
//                     client={client}
//                     store={{} as any}
//                     type={"client"}
//                 >
//                     <div>Hello World!</div>
//                 </ApplicationEntry>;
//                 const html = await renderWithClient(app, client);
//                 expect(html.container).toMatchSnapshot();
//             });

//             it("should ProviderService service exist", async () => {
//                 const client = getClient({});
//                 const isProviderServiceExist = jest.fn();
//                 // tslint:disable-next-line
//                 class ProviderServiceCheck extends React.PureComponent<{}> {
//                     @inject private providerService: ProviderService;

//                     public render() {
//                         if (this.providerService) {
//                             isProviderServiceExist();
//                         }

//                         return (
//                             <div/>
//                         );
//                     }
//                 }
//                 const app = <ApplicationEntry
//                     client={client}
//                     store={{}}
//                     type={"client"}
//                 >
//                     <ProviderServiceCheck/>
//                 </ApplicationEntry>;
//                 await renderWithClient(app, client);
//                 expect(isProviderServiceExist).toBeCalled();
//             });

//             it("should StoreService service exist", async () => {
//                 const client = getClient({});
//                 const isStoreServiceExist = jest.fn();
//                 // tslint:disable-next-line
//                 class StoreServiceCheck extends React.PureComponent<{}> {
//                     @inject private storeService: StoreService;

//                     public render() {
//                         if (this.storeService) {
//                             isStoreServiceExist();
//                         }

//                         return (
//                             <div/>
//                         );
//                     }
//                 }
//                 const app = <ApplicationEntry
//                     client={client}
//                     store={{}}
//                     type={"client"}
//                 >
//                     <StoreServiceCheck/>
//                 </ApplicationEntry>;
//                 await renderWithClient(app, client);
//                 expect(isStoreServiceExist).toBeCalled();
//             });
//         });
//     });
// });
