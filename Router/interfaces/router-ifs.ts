import { Handler, RequestMethod } from "./types";

export interface RouterRequest {
    method?: string | undefined,
    url?: string,
}

export interface ResponseMessage {
    code: number,
    body: string
}

export interface Route {
    method: RequestMethod,
    url: string,
    handler: Handler
}