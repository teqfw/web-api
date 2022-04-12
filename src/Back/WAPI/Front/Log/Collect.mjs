/**
 * Web API service to collect logs sent from fronts.
 *
 * @namespace TeqFw_Web_Api_Back_WAPI_Front_Log_Collect
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Api_Back_WAPI_Front_Log_Collect';

/**
 * @implements TeqFw_Web_Api_Back_Api_Factory_IService
 */
export default class TeqFw_Web_Api_Back_WAPI_Front_Log_Collect {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Api_Back_Defaults} */
        const DEF = spec['TeqFw_Web_Api_Back_Defaults$'];
        /** @type {TeqFw_Web_Api_Shared_WAPI_Front_Log_Collect} */
        const endpoint = spec['TeqFw_Web_Api_Shared_WAPI_Front_Log_Collect$'];
        /** @type {TeqFw_Core_Shared_Api_Logger_ITransport} */
        const loggerTransport = spec['TeqFw_Core_Shared_Api_Logger_ITransport$'];
        /** @type {TeqFw_Core_Shared_Dto_Log} */
        const dtoLog = spec['TeqFw_Core_Shared_Dto_Log$'];
        /** @type {typeof TeqFw_Web_Shared_Enum_Log_Type} */
        const TYPE = spec['TeqFw_Web_Shared_Enum_Log_Type$'];

        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.getService = function () {
            // FUNCS
            /**
             * @param {TeqFw_Web_Api_Back_Mod_Request_Context} context
             */
            async function service(context) {
                /** @type {TeqFw_Web_Api_Shared_WAPI_Front_Log_Collect.Request} */
                const req = context.getInData();
                /** @type {TeqFw_Web_Api_Shared_WAPI_Front_Log_Collect.Response} */
                const res = context.getOutData();
                const dto = dtoLog.createDto(req.item);
                dto.meta[DEF.MOD_WEB.SHARED.LOG_META_TYPE] = TYPE.FRONT;
                loggerTransport.log(dto);
                res.success = true;
            }

            // MAIN
            Object.defineProperty(service, 'namespace', {value: NS});
            return service;
        }
    }

}
