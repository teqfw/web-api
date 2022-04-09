/**
 * Endpoint data for service to load list of files to be cached on the front by service worker.
 *
 * @namespace TeqFw_Web_Api_Shared_WAPI_Load_FilesToCache
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Api_Shared_WAPI_Load_FilesToCache';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Api_Shared_WAPI_Load_FilesToCache
 */
class Request {
    /**
     * Door name to get statics for (entry point - 'pub', 'admin', ...).
     * @type {string}
     */
    door;
}

/**
 * @memberOf TeqFw_Web_Api_Shared_WAPI_Load_FilesToCache
 */
class Response {
    /** @type {string[]} */
    items;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_IEndpoint
 */
export default class TeqFw_Web_Api_Shared_WAPI_Load_FilesToCache {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Api_Shared_Defaults} */
        const DEF = spec['TeqFw_Web_Api_Shared_Defaults$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castArrayOfStr|function} */
        const castArrayOfStr = spec['TeqFw_Core_Shared_Util_Cast.castArrayOfStr'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // DEFINE INSTANCE METHODS
        /**
         * @param {Request} [data]
         * @return {TeqFw_Web_Api_Shared_WAPI_Load_FilesToCache.Request}
         */
        this.createReq = function (data) {
            const res = new Request();
            res.door = castString(data?.door);
            return res;
        }

        /**
         * @param {Response} [data]
         * @return {TeqFw_Web_Api_Shared_WAPI_Load_FilesToCache.Response}
         */
        this.createRes = function (data) {
            const res = new Response();
            res.items = castArrayOfStr(data?.items);
            return res;
        }

        this.getRoute = () => `/${DEF.NAME}${DEF.WAPI_LOAD_FILES_TO_CACHE}`;
    }

}

// finalize code components for this es6-module
Object.defineProperty(Request, 'namespace', {value: NS});
Object.defineProperty(Response, 'namespace', {value: NS});
