import { IConfigScope } from "./IConfig";

const config: IConfigScope = {
  default: {
    logLevel: "info",
    db: {
      default: {
        database: process.env.DB_DATABASE || "todo",
        host: process.env.DB_HOSTNAME || "localhost",
        password: process.env.DB_PASSWORD || "",
        port: (process.env as any).DB_PORT || 5432,
        type: (process.env as any).DB_TYPE || "postgres",
        username: process.env.DB_USERNAME || "root",
        synchronize: true,
      },
    },
    publicConfig: {
      graphqlEndpoint: `${process.env.NOW_URL || "http://localhost:3000"}/graphql`,
    },
  },
};

export default config;
