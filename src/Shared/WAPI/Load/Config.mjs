/**
 * Endpoint data for service to load app configuration to the front.
 *
 * @namespace TeqFw_Web_Api_Shared_WAPI_Load_Config
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Api_Shared_WAPI_Load_Config';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Api_Shared_WAPI_Load_Config
 */
class Request {}

/**
 * This response contains unstructured data.
 * @memberOf TeqFw_Web_Api_Shared_WAPI_Load_Config
 */
class Response {}

/**
 * @implements TeqFw_Web_Api_Shared_Api_IEndpoint
 */
export default class TeqFw_Web_Api_Shared_WAPI_Load_Config {

    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Api_Shared_Defaults} */
        const DEF = spec['TeqFw_Web_Api_Shared_Defaults$'];

        // INSTANCE METHODS

        /**
         * @param {Request|null} data
         * @return {TeqFw_Web_Api_Shared_WAPI_Load_Config.Request}
         */
        this.createReq = function (data = null) {
            return new Request();
        }

        /**
         * This response contains unstructured data.
         * @param {Response|null} data
         * @return {TeqFw_Web_Api_Shared_WAPI_Load_Config.Response}
         */
        this.createRes = function (data = null) {
            return Object.assign(new Response(), data);
        }

        this.getRoute = () => `/${DEF.NAME}${DEF.WAPI_LOAD_CONFIG}`;
    }

}

// finalize code components for this es6-module
Object.defineProperty(Request, 'namespace', {value: NS});
Object.defineProperty(Response, 'namespace', {value: NS});
