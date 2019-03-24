import { ApolloServer } from "apollo-server-express";
import * as TypeQL from "typegql";
import { runHandler, server } from "../../express";
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

export const handler = runHandler();
