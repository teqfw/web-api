/**
 * Endpoint data for simple service to check availability of the server from a front using GET request.
 *
 * @namespace TeqFw_Web_Api_Shared_WAPI_Alive
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Api_Shared_WAPI_Alive';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Api_Shared_WAPI_Alive
 */
class Request {}

/**
 * @memberOf TeqFw_Web_Api_Shared_WAPI_Alive
 */
class Response {
    /**
     * Backend UUID as payload.
     * @type {string}
     */
    payload;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_IEndpoint
 */
export default class TeqFw_Web_Api_Shared_WAPI_Alive {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Api_Shared_Defaults} */
        const DEF = spec['TeqFw_Web_Api_Shared_Defaults$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // INSTANCE METHODS

        /**
         * @param {Request|null} [data]
         * @return {TeqFw_Web_Api_Shared_WAPI_Alive.Request}
         */
        this.createReq = function (data) {
            const res = new Request();
            return res;
        }

        /**
         * @param {Response|null} [data]
         * @return {TeqFw_Web_Api_Shared_WAPI_Alive.Response}
         */
        this.createRes = function (data) {
            const res = new Response();
            res.payload = castString(data?.payload);
            return res;
        }

        this.getRoute = () => `/${DEF.NAME}${DEF.WAPI_ALIVE}`;
    }
}

// finalize code components for this es6-module
Object.defineProperty(Request, 'namespace', {value: NS});
Object.defineProperty(Response, 'namespace', {value: NS});
