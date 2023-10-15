import { RequestMethod } from "./types";

export interface RouterRequest {
    method: RequestMethod,
    url: string,
    handler: CallableFunction
}

export interface ResponseMessage {
    code: number,
    body: string
}
