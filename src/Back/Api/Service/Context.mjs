/**
 * Structure to represent request context for services.
 */
export default class TeqFw_Web_Api_Back_Api_Service_Context {
    /** @type {module:http.IncomingMessage|module:http2.Http2ServerRequest} */
    request;
    /** @type {module:http.ServerResponse|module:http2.Http2ServerResponse} */
    response;
}