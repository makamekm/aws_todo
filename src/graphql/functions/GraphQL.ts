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
    context: ({req}) => {
        return {
            user: req.user,
        };
    },
    schema,
    tracing: true,
});

serverQl.applyMiddleware({ app: server });

export const handler = (serverless as any)(server);

// export const handler = server.createHandler();
