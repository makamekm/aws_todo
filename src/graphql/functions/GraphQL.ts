import { ApolloServer } from "apollo-server-lambda";
import * as TypeQL from "typegql";
import { getSchemas } from "../../main/graphql";

const schema = TypeQL.compileSchema({
    roots: getSchemas(),
});

const server = new ApolloServer({
    // Interceptors are going here
    // context: ({ event, context }) => ({
    //     headers: event.headers,
    //     functionName: context.functionName,
    //     event,
    //     context,
    // }),
    schema,
    tracing: true,
});

export const handler = server.createHandler();
