import { IConfigScope } from "./IConfig";

const config: IConfigScope = {
  default: {
    logLevel: "info",
    db: {
      default: {
        type: "mongodb",
        synchronize: true,
        useNewUrlParser: true,
        url: process.env.DB_URL || "mongodb+srv://root:root@localhost/test?retryWrites=true",
      },
    },
    publicConfig: {
      graphqlEndpoint: `${process.env.NOW_URL || "http://localhost:3000"}/graphql`,
    },
  },
};

export default config;
