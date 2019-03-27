import { GraphQLClient } from "graphql-hooks";
import * as memCache from "graphql-hooks-memcache";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { renderRoutes } from "react-router-config";
import { ApplicationEntry } from "../iso/components/ApplicationEntry";
import { getRoutes } from "../iso/routing";

const store = (window as any).__STORE_STATE__ || {};

const client = new GraphQLClient({
  url: store.config.graphqlEndpoint,
  cache: memCache({
    initialState: (window as any).__APOLLO_STATE__ || {},
  }),
});

const routes = renderRoutes(getRoutes());

ReactDOM.hydrate(
  (
    <ApplicationEntry
      type="client"
      client={client}
      store={store}
    >
      {routes}
    </ApplicationEntry>
  ),
  document.getElementById("app"),
);

// If you want to declare a service worker
// if ("serviceWorker" in window.navigator) {
//     window.navigator.serviceWorker.register("/sw.js", { scope: "/" });
// }
