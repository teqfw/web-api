/**
 * Model to represent context for processing one HTTP request to an API service.
 *
 * @namespace TeqFw_Web_Api_Back_Mod_Request_Context
 */
// MODULE'S IMPORT
import {constants as H2} from 'http2';

// MODULE'S CLASSES
export default class TeqFw_Web_Api_Back_Mod_Request_Context {
    /**
     * This is not DI compatible constructor. Use Factory class to create new instances.
     * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest} req
     * @param {Object<string, string>} params
     * @param {TeqFw_Core_Shared_Mod_Map} share
     * @param {Object|null} inStruct
     * @param {Object} outStruct
     */
    constructor(req, params, share, inStruct, outStruct) {

        // DEFINE WORKING VARS / PROPS
        /** @type {module:http.IncomingMessage|module:http2.Http2ServerRequest} */
        const httpRequest = req;
        /** @type {TeqFw_Core_Shared_Mod_Map} */
        const handlersShare = share;
        /** @type {Object} */
        const inData = inStruct;
        /** @type {Object} */
        const outData = outStruct;
        /** @type {Object<string, string>} */
        const outHeaders = {};
        /** @type {Object<string, string>} */
        const routeParams = params;

        // DEFINE INSTANCE METHODS

        /**
         * Get objects registry that is shared between all handlers.
         * @return {TeqFw_Core_Shared_Mod_Map}
         */
        this.getHandlersShare = () => handlersShare;

        /**
         * Get service input data extracted from the POSTed JSON.
         * @return {Object}
         */
        this.getInData = () => inData;

        /**
         * Get service output data to be send as JSON in the response.
         * @return {Object}
         */
        this.getOutData = () => outData;

        /**
         * Get service output headers to be send in response.
         * @return {Object<string, string>}
         */
        this.getOutHeaders = () => outHeaders;

        /**
         * Get HTTP request url (/root/door/space/route).
         * @return {string} data
         */
        this.getRequestUrl = () => httpRequest?.url;

        /**
         * Get params for route (/post/:postId/comment/:commentId).
         * @return {Object<string, string>} data
         */
        this.getRouteParams = () => routeParams;

        /**
         * Add/replace one header to be sent in the response.
         * @param {string} key
         * @param {string} value
         */
        this.setOutHeader = function (key, value) {
            if (key === H2.HTTP2_HEADER_SET_COOKIE) {
                if (outHeaders[key]) {
                    // merge cookies
                    outHeaders[key] += `;${value}`;
                } else {
                    // add cookie
                    outHeaders[key] = value;
                }
            } else {
                outHeaders[key] = value;
            }
        }
    }
}
