import {
    APIGatewayEventRequestContext,
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from "aws-lambda";
import * as serverless from "serverless-http";
import * as TypeQL from "typegql";
import { server } from "../../express";
import {serverSideRendering} from "../render/ServerSideRendering";

server.use("*",
    async (req, res, next) => {
        const headers = req.headers;
        const user = req.user;
        const url = req.url;

        // console.log(url, headers, user);
        // res.send("hello");
        try {
            const body = await serverSideRendering(url, headers, user);
            console.log(url, headers, user);
            res.send(body);
        } catch (error) {
            console.error(error);
            res.send(error.message);
        }
    },
);

export const application = (serverless as any)(server);

// export async function application(
//     event: APIGatewayProxyEvent,
//     context: APIGatewayEventRequestContext,
//     callback,
//     _serverSideRendering = serverSideRendering,
// ): Promise<APIGatewayProxyResult> {
//     const body = await _serverSideRendering(event.path);
//     return {
//         body,
//         headers: {
//             "content-type": "text/html; charset=utf-8",
//         },
//         statusCode: 200,
//     };
// }
