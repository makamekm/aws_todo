import { ApolloServer } from "apollo-server-express";
import * as TypeQL from "typegql";
import { server } from ".";
import { TodoSchema } from "../graphql";

const schema = TypeQL.compileSchema({
    roots: [ TodoSchema ],
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

serverQl.applyMiddleware({ app: server, path: "/graphql" });
