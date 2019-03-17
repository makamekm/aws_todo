import * as React from "react";
import * as serialize from "serialize-javascript";

export const Html = (
  { markup, store, styles, helmet, state }:
  {
    markup: any;
    store: any;
    styles: any;
    helmet: any;
    state: any;
  },
) => {
  const serializedFlowState = serialize(store || {}, { isJSON: true });
  const serializedApolloState = serialize(state || {}, { isJSON: true });

  const flowState = (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__STORE_STATE__=${serializedFlowState};`,
      }}
      charSet="UTF-8"
    />
  );

  const apolloState = (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__APOLLO_STATE__=${serializedApolloState};`,
      }}
      charSet="UTF-8"
    />
  );

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.script.toComponent()}
        {styles}
      </head>
      <body>
        <main
          id="app"
          dangerouslySetInnerHTML={{ __html: markup }}
        />
        {flowState}
        {apolloState}
        <script src={"/public/index.js"} key={"index.js"}/>
      </body>
    </html>
  );
};
