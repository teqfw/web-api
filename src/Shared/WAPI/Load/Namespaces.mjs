/**
 * Endpoint data for service to load DI namespaces to the front.
 *
 * @namespace TeqFw_Web_Api_Shared_WAPI_Load_Namespaces
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Api_Shared_WAPI_Load_Namespaces';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Api_Shared_WAPI_Load_Namespaces
 */
class Request {}

/**
 * @memberOf TeqFw_Web_Api_Shared_WAPI_Load_Namespaces
 */
class Response {
    /** @type {TeqFw_Web_Api_Shared_Dto_Namespace_Item[]} */
    items;
    /** @type {TeqFw_Web_Api_Shared_Dto_Namespace_Replace[]} */
    replaces;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_IEndpoint
 */
export default class TeqFw_Web_Api_Shared_WAPI_Load_Namespaces {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Api_Shared_Defaults} */
        const DEF = spec['TeqFw_Web_Api_Shared_Defaults$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castArrayOfObj|function} */
        const castArrayOfObj = spec['TeqFw_Core_Shared_Util_Cast#castArrayOfObj'];
        /** @type {TeqFw_Web_Api_Shared_Dto_Namespace_Item.Factory} */
        const fItem = spec['TeqFw_Web_Api_Shared_Dto_Namespace_Item#Factory$'];
        /** @type {TeqFw_Web_Api_Shared_Dto_Namespace_Replace.Factory} */
        const fReplace = spec['TeqFw_Web_Api_Shared_Dto_Namespace_Replace#Factory$'];

        // DEFINE INSTANCE METHODS
        /**
         * @param {Request|null} [data]
         * @return {TeqFw_Web_Api_Shared_WAPI_Load_Namespaces.Request}
         */
        this.createReq = function (data) {
            return new Request();
        }

        /**
         * @param {Response|null} [data]
         * @return {TeqFw_Web_Api_Shared_WAPI_Load_Namespaces.Response}
         */
        this.createRes = function (data) {
            const res = new Response();
            res.items = castArrayOfObj(data?.items, fItem.create);
            res.replaces = castArrayOfObj(data?.replaces, fReplace.create);
            return res;
        }

        this.getRoute = () => `/${DEF.NAME}${DEF.WAPI_LOAD_NAMESPACES}`;
    }

}

// finalize code components for this es6-module
Object.defineProperty(Request, 'namespace', {value: NS});
Object.defineProperty(Response, 'namespace', {value: NS});
