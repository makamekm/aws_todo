import { ClientContext, GraphQLClient } from "graphql-hooks";
import * as React from "react";
import { provider, toValue } from "react-ioc";
import { StaticRouter } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { UserService } from "../../iso/services/UserService";
import { ProviderService } from "../services/ProviderService";
import { StoreService } from "../services/StoreService";

export interface IApplicationEntryProps {
  location?: any;
  type: "client" | "server";
  client: GraphQLClient;
  store: StoreService;
  children: any;
}

@provider()
export class ApplicationEntry extends React.PureComponent<IApplicationEntryProps> {
  public constructor(props, context) {
    super(props, context);
    this.initStoreService(props);
    this.initProviderService(props);
    this.initUserService(props);
  }

  public render() {
    const {
      location,
      type,
      client,
    } = this.props;
    const content = this.props.children;
    return (
      <ClientContext.Provider value={client}>
        {type === "client" ? (
          <BrowserRouter>
            {content}
          </BrowserRouter>
        ) : (
          <StaticRouter location={location} context={{}}>
            {content}
          </StaticRouter>
        )}
      </ClientContext.Provider>
    );
  }

  private initStoreService(props: IApplicationEntryProps) {
    const storeService = props.store;
    ApplicationEntry.register([StoreService, toValue(storeService)]);
    return storeService;
  }

  private initProviderService(props: IApplicationEntryProps) {
    const providerService = new ProviderService();
    providerService.client = props.client;
    ApplicationEntry.register([ProviderService, toValue(providerService)]);
  }

  private initUserService(props: IApplicationEntryProps) {
    ApplicationEntry.register(UserService);
  }
}
