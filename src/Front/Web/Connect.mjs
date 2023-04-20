/**
 * Common gateway to Web API services.
 *
 * @namespace TeqFw_Web_Api_Front_Web_Connect
 */
// MODULE'S CLASSES
export default class TeqFw_Web_Api_Front_Web_Connect {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Api_Front_Defaults} */
        const DEF = spec['TeqFw_Web_Api_Front_Defaults$'];
        /** @type {TeqFw_Web_Front_Api_Gate_IErrorHandler} */
        const errHndl = spec['TeqFw_Web_Front_Api_Gate_IErrorHandler$'];
        /** @type {TeqFw_Web_Front_Api_Mod_Server_Connect_IState} */
        const state = spec['TeqFw_Web_Front_Api_Mod_Server_Connect_IState$'];
        /** @type {TeqFw_Web_Front_Mod_Config} */
        const modCfg = spec['TeqFw_Web_Front_Mod_Config$'];
        /** @type {typeof TeqFw_Web_Api_Shared_Api_Request} */
        const Request = spec['TeqFw_Web_Api_Shared_Api_Request#'];

        // VARS
        let BASE;

        // FUNCS
        function getBaseUrl() {
            if (!BASE) {
                const cfg = modCfg.get();
                const schema = '//';
                const domain = cfg.urlBase ?? location.hostname;
                let port = location.port; // empty string for default ports (80 & 443)
                if (port !== '') port = `:${port}`;
                const root = (cfg.root) ? `/${cfg.root}` : '';
                const door = (cfg.door) ? `/${cfg.door}` : '';
                const space = `/${DEF.SHARED.SPACE_SERVICE}`;
                BASE = `${schema}${domain}${port}${root}${door}${space}`;
            }
            return BASE;
        }

        // INSTANCE METHODS
        /**
         * Send API service request to backend and extract result from response.
         *
         * @param {Object} data JS-object to be sent as request
         * @param {TeqFw_Web_Api_Shared_Api_Endpoint} endpoint
         * @param {Object} [opts] TODO: use it or remove it
         * @returns {Promise<Object>}
         */
        this.send = async function (data, endpoint, opts = null) {
            // start displaying a network activity led on UI
            state.startActivity();
            try {
                const req = new Request();
                req.data = data;
                // endpoint name is a route: App_Shared_Web_Api_Endpoint
                const route = endpoint.constructor.name;
                const URL = `${getBaseUrl()}/${route}`;
                const res = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(req)
                });
                try {
                    /** @type {TeqFw_Web_Api_Shared_Api_Response} */
                    const json = await res.json();
                    if (!json.error) return endpoint.createRes(json.data);
                    else errHndl.error(json.error);
                } catch (e) {
                    errHndl.error(e);
                }
            } catch (e) {
                errHndl.error(e);
            } finally {
                // stop displaying a network activity led on UI
                state.stopActivity();
            }
            return null;
        };
    }
}
