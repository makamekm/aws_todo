import * as express from "express";
import * as path from "path";
const reload = require("reload");
import {server} from "./src/express";

server.use("/public", (express as any).static(path.resolve("./public")));

reload(server);

import "./src/entry/application";

server.listen(3000);
