import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";

export async function ping(
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext,
): Promise<APIGatewayProxyResult> {
  return {
    body: JSON.stringify({
      input: event,
      message: "Pong",
    }),
    statusCode: 200,
  };
}
