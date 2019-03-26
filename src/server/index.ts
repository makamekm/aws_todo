import { server } from "../express";
import {serverSideRendering} from "./render/ServerSideRendering";

server.use("*",
    async (req, res, next) => {
        const headers = req.headers;
        const user = req.user;
        const url = req.url;

        try {
            const body = await serverSideRendering(url, headers, user);
            res.send(body);
        } catch (error) {
            // console.error(error);
            res.send(error.message);
        }
    },
);

export default server;
