import { ResponseMessage, RouterRequest } from "./interfaces/router-ifs";
import { RequestMethod } from "./interfaces/types";
import 'dotenv/config'

export class Router {
    private routes: Array<RouterRequest>

    constructor() {
        this.routes = [];
    }

    add(method: RequestMethod, url: string, handler: CallableFunction): void {
        const request: RouterRequest = {
            method,
            url: process.env.BASE_URL + url,
            handler
        };

        this.routes.push(request);
    }

    getResponse(request: RouterRequest | any, response: unknown): ResponseMessage[] | ResponseMessage {
        const responses: ResponseMessage[] = []

        for (const { method, url, handler } of this.routes) {
            if (method === request.method) {
                if (request.url) {
                    const requestUrl = new URL(request.url, process.env.BASE_URL);
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
