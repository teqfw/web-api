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
    /** @type {TeqFw_Web_Shared_Dto_Config_Di_Namespace[]} */
    items;
    /** @type {TeqFw_Web_Shared_Dto_Config_Di_Replacement[]} */
    replaces;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_IEndpoint
 * @deprecated use TeqFw_Web_Back_App_Server_Handler_Config
 */
export default class TeqFw_Web_Api_Shared_WAPI_Load_Namespaces {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Api_Shared_Defaults} */
        const DEF = spec['TeqFw_Web_Api_Shared_Defaults$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castArrayOfObj|function} */
        const castArrayOfObj = spec['TeqFw_Core_Shared_Util_Cast#castArrayOfObj'];
        /** @type {TeqFw_Web_Shared_Dto_Config_Di_Namespace} */
        const fItem = spec['TeqFw_Web_Shared_Dto_Config_Di_Namespace$'];
        /** @type {TeqFw_Web_Shared_Dto_Config_Di_Replacement} */
        const fReplace = spec['TeqFw_Web_Shared_Dto_Config_Di_Replacement$'];

        // INSTANCE METHODS
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
            res.items = castArrayOfObj(data?.items, fItem.createDto);
            res.replaces = castArrayOfObj(data?.replaces, fReplace.createDto);
            return res;
        }

        this.getRoute = () => `/${DEF.NAME}${DEF.WAPI_LOAD_NAMESPACES}`;
    }

}

// finalize code components for this es6-module
Object.defineProperty(Request, 'namespace', {value: NS});
Object.defineProperty(Response, 'namespace', {value: NS});
