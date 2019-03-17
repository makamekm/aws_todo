import {
    APIGatewayEventRequestContext,
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from "aws-lambda";
import {serverSideRendering} from "../render/ServerSideRendering";

export async function application(
    event: APIGatewayProxyEvent,
    context: APIGatewayEventRequestContext,
    callback,
    _serverSideRendering = serverSideRendering,
): Promise<APIGatewayProxyResult> {
    const body = await _serverSideRendering(event);
    return {
        body,
        headers: {
            "content-type": "text/html; charset=utf-8",
        },
        statusCode: 200,
    };
}
