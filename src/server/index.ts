import { server } from "./express";
import {serverSideRendering} from "./render/ServerSideRendering";

server.use("*",
    async (req, res, next) => {
        try {
            const body = await serverSideRendering(req);
            res.send(body);
        } catch (error) {
            // console.error(error);
            res.send(error.message);
        }
    },
);

export default server;
