import * as express from "express";
import * as path from "path";
import {server} from "./src/express";

server.use("/public", (express as any).static(path.resolve("./public")));

import "./src/entry/application";

server.listen(3000);
