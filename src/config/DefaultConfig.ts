import { IConfigScope } from "./IConfig";

const config: IConfigScope = {
  default: {
    logLevel: "info",
    db: {
      default: {
        database: "todo",
        host: "localhost",
        password: "",
        port: 5432,
        type: "postgres",
        username: "root",
        synchronize: true,
      },
    },
    publicConfig: {
      graphqlEndpoint: "http://localhost:3000/graphql",
    },
  },
};

export default config;
