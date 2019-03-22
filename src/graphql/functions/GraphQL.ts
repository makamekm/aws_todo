// import { ApolloServer } from "apollo-server-lambda";
import { ApolloServer } from "apollo-server-express";
import * as passport from "passport";
import * as serverless from "serverless-http";
import * as TypeQL from "typegql";
import { server } from "../../express";
import { getSchemas } from "../../main/graphql";

const schema = TypeQL.compileSchema({
    roots: getSchemas(),
});

server.use("*",
    (req, res, next) => {
        console.log("hereUser", req);
        next();
    },
);

const serverQl = new ApolloServer({
    // Interceptors are going here
    context: ({req}) => {
        console.log("here", req.user);
        return {};
    },
    schema,
    tracing: true,
});

serverQl.applyMiddleware({ app: server });

export const handler = serverless(server);

// export const handler = server.createHandler();
