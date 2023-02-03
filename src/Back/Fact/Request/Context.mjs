/**
 * Factory to create context objects for each HTTP request (TeqFw_Web_Api_Back_Mod_Request_Context).
 *
 * @namespace TeqFw_Web_Api_Back_Fact_Request_Context
 */
// MODULE'S IMPORT

// MODULE'S VARS
const NS = 'TeqFw_Web_Api_Back_Fact_Request_Context';

// MODULE'S FUNCS
/**
 * Default export is a factory to create result function in working environment (with deps).
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 */
export default function (spec) {
    // DEPS
    /** @type {TeqFw_Web_Api_Back_Defaults} */
    const DEF = spec['TeqFw_Web_Api_Back_Defaults$'];
    /** @type {typeof TeqFw_Web_Api_Back_Mod_Request_Context} */
    const Context = spec['TeqFw_Web_Api_Back_Mod_Request_Context#'];

    // FUNCS

    /**
     * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest}req
     * @param params
     * @param {TeqFw_Web_Api_Shared_Api_IEndpoint} endpoint
     * @return {TeqFw_Web_Api_Back_Mod_Request_Context}
     * @memberOf TeqFw_Web_Api_Back_Fact_Request_Context
     */
    function create(req, params, endpoint) {
        const shares = req[DEF.MOD_WEB.HNDL_SHARE];
        const json = shares[DEF.MOD_WEB.SHARE_REQ_BODY_JSON];
        const inData = (json) ? endpoint.createReq(json?.data) : null;
        const outData = endpoint.createRes();
        return new Context(req, params, shares, inData, outData);
    }

    // MAIN
    Object.defineProperty(create, 'namespace', {value: NS});
    return create;
}
