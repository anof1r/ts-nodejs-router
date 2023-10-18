import { ResponseMessage, Route, RouterRequest } from "./interfaces/router-ifs";
import { Handler, RequestMethod } from "./interfaces/types";

export class Router {
    private routes: Array<Route>

    constructor() {
        this.routes = [];
    }

    add(method: RequestMethod, url: string, handler: Handler): void {
        const request: Route = {
            method,
            url,
            handler
        };

        this.routes.push(request);
    }

    async getResponse(request: RouterRequest, response: unknown): Promise<ResponseMessage[] | ResponseMessage> {
        const responses: ResponseMessage[] = []

        for (const { method, url, handler } of this.routes) {
            if (method === request.method) {
                if (url === request.url) {
                    const handlerResponse = await handler(request, request.url, response)
                    responses.push(handlerResponse)
                }
            }
        }

        if (responses.length > 0) {
            return responses
        } else {
            return {
                code: 404,
                body: 'Not Found'
            };
        }
    }
}
