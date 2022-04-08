/**
 * Web API service to load configuration on the front.
 *
 * @namespace TeqFw_Web_Api_Back_WAPI_Load_Config
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Api_Back_WAPI_Load_Config';

/**
 * @implements TeqFw_Web_Api_Back_Api_Factory_IService
 */
export default class TeqFw_Web_Api_Back_WAPI_Load_Config {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Api_Back_Defaults} */
        const DEF = spec['TeqFw_Web_Api_Back_Defaults$'];
        /** @type {TeqFw_Core_Back_Config} */
        const config = spec['TeqFw_Core_Back_Config$'];
        /** @type {TeqFw_Web_Api_Shared_WAPI_Load_Config} */
        const endpoint = spec['TeqFw_Web_Api_Shared_WAPI_Load_Config$'];
        /** @type {TeqFw_Web_Front_Dto_Config.Factory} */
        const factDto = spec['TeqFw_Web_Front_Dto_Config.Factory$'];

        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.getService = function () {
            // FUNCS
            /**
             *
             * @param {TeqFw_Web_Api_Back_Mod_Request_Context} context
             * @return {Promise<void>}
             */
            async function service(context) {
                /** @type {TeqFw_Web_Api_Shared_WAPI_Load_Config.Response} */
                const out = context.getOutData();
                // put web part of the local configuration to the out
                // TODO: move local config to 'web-api' plugin
                /** @type {TeqFw_Web_Back_Dto_Config_Local} */
                const webCfg = config.getLocal(DEF.MOD_WEB.SHARED.NAME);
                /** @type {TeqFw_Core_Back_Api_Dto_Config_Local} */
                const webCore = config.getLocal(DEF.MOD_WEB.MOD_CORE.SHARED.NAME);
                /** @type {TeqFw_Web_Front_Dto_Config} */
                const res = factDto.create();
                if (webCfg.urlBase) res.urlBase = webCfg.urlBase;
                if (webCfg.frontLogsMonitoring) res.frontLogsMonitoring = webCfg.frontLogsMonitoring; // 'true' only
                if (webCore.devMode) res.devMode = webCore.devMode;
                Object.assign(out, res);
            }

            // MAIN
            Object.defineProperty(service, 'namespace', {value: NS});
            return service;
        }
    }

}
