import * as express from "express";
import * as path from "path";
// tslint:disable-next-line
const reload = require("reload");
import {server} from "./src/server/express";

server.use("/public", (express as any).static(path.resolve("./public")));

reload(server);

import "./src/server";

server.listen(3000);
