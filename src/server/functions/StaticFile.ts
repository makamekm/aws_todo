import {
    APIGatewayEventRequestContext,
    APIGatewayProxyEvent,
} from "aws-lambda";
import * as fs from "fs";
import * as mime from "mime-types";
import * as path from "path";

function parseEventPath(eventPath: string) {
    return eventPath.replace(/^\/public\//gi, "");
}

function parseFilePath(eventPath: string) {
    return path.resolve(
        "./public",
        eventPath,
    );
}

export async function staticFile(
    event: APIGatewayProxyEvent,
    context: APIGatewayEventRequestContext,
    callback,
    _fs = fs,
    _mime = mime,
) {
    const eventPath = parseEventPath(event.path);
    const filePath = parseFilePath(eventPath);

    if (!_fs.existsSync(filePath)) {
        return {
            statusCode: 404,
        };
    } else {
        const data = _fs.readFileSync(filePath, "base64");
        const contentType = _mime.lookup(filePath);

        return {
            body: data,
            headers: {
                "Content-Type": contentType,
            },
            isBase64Encoded: true,
            statusCode: 200,
        };
    }
}
