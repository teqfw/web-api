/**
 * Endpoint data for service to register newly installed front on server.
 *
 * @namespace TeqFw_Web_Api_Shared_WAPI_Front_Register
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Api_Shared_WAPI_Front_Register';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Api_Shared_WAPI_Front_Register
 */
class Request {
    /** @type {string} */
    publicKey;
    /** @type {string} */
    uuid;
}

/**
 * @memberOf TeqFw_Web_Api_Shared_WAPI_Front_Register
 */
class Response {
    /** @type {number} */
    frontId;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_IEndpoint
 */
export default class TeqFw_Web_Api_Shared_WAPI_Front_Register {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Api_Shared_Defaults} */
        const DEF = spec['TeqFw_Web_Api_Shared_Defaults$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // INSTANCE METHODS
        /**
         * @param {Request|null} data
         * @return {TeqFw_Web_Api_Shared_WAPI_Front_Register.Request}
         */
        this.createReq = function (data = null) {
            const res = new Request();
            res.publicKey = castString(data?.publicKey);
            res.uuid = castString(data?.uuid);
            return res;
        }

        /**
         * @param {Response|null} data
         * @return {TeqFw_Web_Api_Shared_WAPI_Front_Register.Response}
         */
        this.createRes = function (data = null) {
            const res = new Response();
            res.frontId = castInt(data?.frontId);
            return res;
        }

        this.getRoute = () => `/${DEF.NAME}${DEF.WAPI_FRONT_REGISTER}`;
    }

}

// finalize code components for this es6-module
Object.defineProperty(Request, 'namespace', {value: NS});
Object.defineProperty(Response, 'namespace', {value: NS});
