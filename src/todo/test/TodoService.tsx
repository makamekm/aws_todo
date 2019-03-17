import * as React from "react";
import { provider, toValue } from "react-ioc";
import { getClient, renderAndWrapWithClient, wrapWithClient } from "../../test/Client";
import { TodoService } from "../services/TodoService";

export const getTodoService = () => {
    const service = new TodoService();
    return service;
};

const getWrapWithService = (service, client) => provider([TodoService, toValue(service)])(
    ({children}) => {
        return wrapWithClient(children, client);
    },
);

export const renderAndWrapWithService = async (children, service = getTodoService(), client = getClient({})) => {
    const WrapWithService = getWrapWithService(service, client);
    return await renderAndWrapWithClient(
        <WrapWithService>
            {children}
        </WrapWithService>,
        client,
    );
};
