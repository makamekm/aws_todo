// import { ApolloServer } from "apollo-server-lambda";
import { ApolloServer } from "apollo-server-express";
import * as serverless from "serverless-http";
import * as TypeQL from "typegql";
import { server } from "../../express";
import { getSchemas } from "../../main/graphql";

const schema = TypeQL.compileSchema({
    roots: getSchemas(),
});

const serverQl = new ApolloServer({
    // Interceptors are going here
    context: ({req}) => {
        console.log(req.user);
        return {
        };
    },
    schema,
    tracing: true,
});

serverQl.applyMiddleware({ app: server });

export const handler = serverless(server);

// export const handler = server.createHandler();
