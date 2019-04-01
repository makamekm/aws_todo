import { GraphQLClient } from "graphql-hooks";
import * as memCache from "graphql-hooks-memcache";
import { getInitialState } from "graphql-hooks-ssr";
import * as moment from "moment";
import fetch from "node-fetch";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Helmet } from "react-helmet";
import { renderRoutes } from "react-router-config";
import { BehaviorSubject } from "rxjs";
import { ServerStyleSheet } from "styled-components";
import { getConfig } from "../../config";
import { ApplicationEntry } from "../../iso/components/ApplicationEntry";
import { getRoutes } from "../../iso/routing";
import { StoreService } from "../../iso/services/StoreService";
import { Html } from "./Html";

export const serverSideRendering = async (req) => {
  const headers = req.headers;
  const user = req.user;
  const url = req.originalUrl;
  const config = JSON.parse(
    JSON.stringify(
      getConfig().publicConfig,
    ),
  );
  const baseUrl = req.header("host");
  config.graphqlEndpoint = `${req.header("x-forwarded-proto") || "http"}://${baseUrl}/graphql`;
  const client = new GraphQLClient({
    url: config.graphqlEndpoint,
    cache: memCache(),
    fetch,
    headers,
    fetchOptions: {
      credentials: "include",
    },
  });
  const sheet = new ServerStyleSheet();
  const store: StoreService = {
    store$: new BehaviorSubject({
      user,
      isLoading: true,
    }),
    config,
    isDev: !process.env.IS_CLOUD,
    date: moment().format(),
  };
  const routes = renderRoutes(getRoutes());
  const app = sheet.collectStyles(
    <ApplicationEntry
      store={store}
      client={client}
      type="server"
      location={url}>
      {routes}
    </ApplicationEntry>,
  );
  const apolloState = await getInitialState({
    App: app,
    client,
    render: renderToStaticMarkup,
  });
  const content = renderToStaticMarkup(app);
  const styles = sheet.getStyleElement();
  const helmet = Helmet.renderStatic();
  const html = renderToStaticMarkup(
    <Html
      markup={content}
      helmet={helmet}
      styles={styles}
      state={apolloState}
      store={store}/>,
  );
  return html;
};
