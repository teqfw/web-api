/**
 * DTO to encapsulate service related data.
 * @deprecated use TeqFw_Web_Api_Back_Api_Service
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Api_Back_Dto_Service';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Api_Back_Dto_Service
 */
class Dto {
    static namespace = NS;
    /** @type {TeqFw_Web_Api_Shared_Api_IEndpoint} */
    endpoint;
    /**
     * Parameters names for the route ('/post/:postId/comment/:commentId' => ['postId', 'commentId'])
     * @type {string[]}
     */
    params = [];
    /**
     * Regular expression for the service route to check request path against it.
     * @type {RegExp}
     */
    regexp;
    /**
     * Route value ('/post/:postId/comment/:commentId').
     * @type {string}
     */
    route;
    /** @type {function(TeqFw_Web_Api_Back_Mod_Request_Context): Promise<void>} */
    service;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class TeqFw_Web_Api_Back_Dto_Service {

    constructor(spec) {
        /** @type {TeqFw_Core_Shared_Util_Cast.castArrayOfStr|function} */
        const castArrayOfStr = spec['TeqFw_Core_Shared_Util_Cast.castArrayOfStr'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castFunction|function} */
        const castFunction = spec['TeqFw_Core_Shared_Util_Cast.castFunction'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // INSTANCE METHODS
        /**
         * @param {TeqFw_Web_Api_Back_Dto_Service.Dto} data
         * @return {TeqFw_Web_Api_Back_Dto_Service.Dto}
         */
        this.createDto = function (data = null) {
            const res = new Dto();
            res.endpoint = data?.endpoint; // TODO: add cast function to check object's interface
            res.params = castArrayOfStr(data?.params);
            res.regexp = data?.regexp; // TODO: add cast function to check object type
            res.route = castString(data?.route);
            res.service = castFunction(data?.service);
            return res;
        }
    }

}
