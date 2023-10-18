import { RouterRequest, ResponseMessage } from "./router-ifs"

export type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'UPDATE';
export type Handler = ((RouterRequest) => Promise<ResponseMessage>) |
                      ((RouterRequest, string) => Promise<ResponseMessage>) |
                      ((RouterRequest, string, any) => Promise<ResponseMessage>) |
                      (() => Promise<ResponseMessage>)
