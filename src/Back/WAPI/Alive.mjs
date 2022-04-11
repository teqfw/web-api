/**
 * Web API service to check availability of the server from a front using GET request.
 *
 * @namespace TeqFw_Web_Api_Back_WAPI_Alive
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Api_Back_WAPI_Alive';

/**
 * @implements TeqFw_Web_Api_Back_Api_Factory_IService
 */
export default class TeqFw_Web_Api_Back_WAPI_Alive {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Back_Mod_App_Uuid} */
        const backUUID = spec['TeqFw_Core_Back_Mod_App_Uuid$'];
        /** @type {TeqFw_Web_Api_Shared_WAPI_Alive} */
        const endpoint = spec['TeqFw_Web_Api_Shared_WAPI_Alive$'];

        // INSTANCE METHODS
        this.getEndpoint = () => endpoint;

        this.getService = function () {
            // FUNCS
            /**
             * @param {TeqFw_Web_Api_Back_Mod_Request_Context} context
             */
            async function service(context) {
                /** @type {TeqFw_Web_Api_Shared_WAPI_Alive.Response} */
                const res = context.getOutData();
                res.payload = backUUID.get();
            }

            // MAIN
            Object.defineProperty(service, 'namespace', {value: NS});
            return service;
        }
    }

}
