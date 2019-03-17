import { ClientContext, GraphQLClient } from "graphql-hooks";
import * as memCache from "graphql-hooks-memcache";
import { getInitialState } from "graphql-hooks-ssr";
import fetch from "node-fetch";
import * as React from "react";
// import {act} from "react-dom/test-utils";
import { renderToStaticMarkup } from "react-dom/server";
import {act, render, RenderResult} from "react-testing-library";

export const getClient = (data, onRequest: any = jest.fn()) => {
    const client = new GraphQLClient({
        url: "http://localhost/graphql",
        cache: memCache(),
        fetch,
    });
    return {
        ...client,
        getCacheKey: jest.fn().mockReturnValue("cacheKey"),
        cacheHit: false,
        loading: false,
        data,
        request: async (request) => {
            onRequest(request);
            return data;
        },
    };
};

export const renderWithClient = async (app, client) => {
    let html: RenderResult;
    await getInitialState({
        App: app,
        client,
        render: renderToStaticMarkup,
    });
    act(() => {
        html = render(app);
    });
    return html;
};

export const wrapWithClient = (content, client) => {
    return <ClientContext.Provider value={client}>
        {content}
    </ClientContext.Provider>;
};

export const renderAndWrapWithClient = async (app, client) => {
    return await renderWithClient(
        wrapWithClient(app, client),
        client,
    );
};
