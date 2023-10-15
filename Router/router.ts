import { ResponseMessage, RouterRequest } from "./interfaces/router-ifs";
import { RequestMethod } from "./interfaces/types";

export class Router {
    private routes: Array<RouterRequest>
    private baseUrl: string = 'http://localhost:4000'

    constructor() {
        this.routes = [];
    }

    add(method: RequestMethod, url: string, handler: CallableFunction): void {
        const request: RouterRequest = {
            method,
            url: this.baseUrl + url,
            handler
        };

        this.routes.push(request);
    }

    getResponse(request: RouterRequest | any, response: unknown): ResponseMessage[] | ResponseMessage {
        const responses: ResponseMessage[] = []

        for (const { method, url, handler } of this.routes) {
            if (method === request.method) {
                if (request.url) {
                    const requestUrl = new URL(request.url, 'http://localhost:4000');
                    if (url === requestUrl.href.toString()) {
                        const handlerResponse = handler(request, requestUrl, response);
                        responses.push(handlerResponse);
                    }
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
