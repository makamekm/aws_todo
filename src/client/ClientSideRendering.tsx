import { GraphQLClient } from "graphql-hooks";
import * as memCache from "graphql-hooks-memcache";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { renderRoutes } from "react-router-config";
import { BehaviorSubject } from "rxjs";
import { ApplicationEntry } from "../iso/components/ApplicationEntry";
import { getRoutes } from "../iso/routing";
import { StoreService } from "../iso/services/StoreService";

const storeData = (window as any).__STORE_STATE__ || {};
const store: StoreService = {
  ...storeData,
  store$: new BehaviorSubject(storeData.store$),
};
console.log("HERE", store.store$.value);


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
  () => {
    store.store$.next({
      ...store.store$.value,
      isLoading: false,
    });
  },
);

// If you want to declare a service worker
// if ("serviceWorker" in window.navigator) {
//     window.navigator.serviceWorker.register("/sw.js", { scope: "/" });
// }
