/**
 * Web server handler to process requests to services (synchronous POST requests with JSON payloads).
 */
// MODULE'S IMPORT
import {constants as H2} from 'node:http2';

// MODULE'S VARS
const {
    HTTP2_HEADER_CONTENT_TYPE,
    HTTP2_METHOD_GET,
    HTTP2_METHOD_POST,
    HTTP_STATUS_OK,
} = H2;


// MODULE'S CLASSES
// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Web_Back_Api_Dispatcher_IHandler
 */
export default class TeqFw_Web_Api_Back_Web_Handler_Service {
    /**
     * @param {TeqFw_Di_Api_Container} container
     * @param {TeqFw_Web_Api_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Web_Back_App_Server_Respond.respond500|function} respond500
     * @param {TeqFw_Core_Back_Api_Plugin_Registry} regPlugins
     * @param {TeqFw_Web_Back_Mod_Address} modAddress
     * @param {typeof TeqFw_Web_Api_Back_Api_Service_Context} Context
     */
    constructor(
        {
            container,
            TeqFw_Web_Api_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            'TeqFw_Web_Back_App_Server_Respond.respond500': respond500,
            TeqFw_Core_Back_Api_Plugin_Registry$: regPlugins,
            TeqFw_Web_Back_Mod_Address$: modAddress,
            'TeqFw_Web_Api_Back_Api_Service_Context.default': Context,
        }
    ) {
        // MAIN
        const DESC_API = DEF.SHARED.NAME;
        /** @type {Object<string, TeqFw_Web_Api_Back_Api_Service>} */
        const services = {};

        // FUNCS
        /**
         * Process HTTP request if not processed before.
         * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest} req
         * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} res
         * @memberOf TeqFw_Web_Api_Back_Web_Handler_Service
         */
        async function process(req, res) {
            // FUNCS
            /**
             * Extract service route from HTTP request.
             * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest} req
             * @returns {string} endpoint class name as a route
             */
            function getServiceName(req) {
                const addr = modAddress.parsePath(req.url);
                return addr?.route?.replace('/', '');
            }

            // MAIN
            /** @type {Object} */
            const shares = res[DEF.MOD_WEB.HNDL_SHARE];
            if (!res.headersSent && !shares[DEF.MOD_WEB.SHARE_RES_STATUS]) {
                const json = shares[DEF.MOD_WEB.SHARE_REQ_BODY_JSON];
                const serviceName = getServiceName(req);
                if (services[serviceName]) {
                    try {
                        logger.info(`Endpoint '${serviceName}' has been requested.`);
                        const one = services[serviceName];
                        const endpoint = one.getEndpoint();
                        // WORKAROUND: own services use {data, meta} structure in req, reqs for other services go as is
                        const data = json?.data ?? json;
                        const apiReq = endpoint.createReq(data);
                        const apiRes = endpoint.createRes();
                        const context = new Context();
                        context.request = req;
                        context.response = res;
                        await one.process(apiReq, apiRes, context);
                        if ((!res.statusCode) || (res.statusCode === HTTP_STATUS_OK)) {
                            // Add JSON result if there were no errors in the handler (status=403, etc.)
                            shares[DEF.MOD_WEB.SHARE_RES_BODY] = JSON.stringify({data: apiRes});
                            res.setHeader(HTTP2_HEADER_CONTENT_TYPE, 'application/json');
                            shares[DEF.MOD_WEB.SHARE_RES_STATUS] = HTTP_STATUS_OK;
                        }
                    } catch (e) {
                        logger.error(`Error in service '${serviceName}': ${e}`);
                        respond500(res, e?.message);
                    }
                }

            }
        }

        // INSTANCE METHODS

        this.getProcessor = () => process;

        this.init = async function () {
            // FUNCS

            // MAIN
            try {
                // scan all plugins and find services
                logger.info(`Initialize Web API (synchronous) requests handler:`);
                const plugins = regPlugins.getItemsByLevels();
                for (const one of plugins) {
                    /** @type {TeqFw_Web_Api_Back_Plugin_Dto_Desc.Dto} */
                    const data = one.teqfw?.[DESC_API];
                    const items = data?.services;
                    if (items?.length) {
                        // create services and store internally
                        for (const moduleId of items) {
                            /** @type {TeqFw_Web_Api_Back_Api_Service} */
                            const service = await container.get(`${moduleId}$`); // singleton
                            logger.info(`    ${moduleId}`);
                            if (typeof service?.init === 'function') await service.init();
                            const endpoint = service.getEndpoint();
                            const route = endpoint.constructor.name;
                            services[route] = service;
                        }
                    }
                }
            } catch (e) {
                logger.error(`Services initialization error: ${e}`);
            }
        };

        this.canProcess = function ({method, address} = {}) {
            return (
                ((method === HTTP2_METHOD_GET) || (method === HTTP2_METHOD_POST))
                && (address?.space === DEF.SHARED.SPACE_SERVICE)
            );
        };
    }
}
