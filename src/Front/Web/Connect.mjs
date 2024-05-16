/**
 * Common gateway to send requests to the Web API services.
 *
 * @TeqFw_Web_Api_Front_Api_Request_Alert TeqFw_Web_Api_Front_Web_Connect
 */
export default class TeqFw_Web_Api_Front_Web_Connect {
    /**
     * @param {TeqFw_Web_Api_Front_Defaults} DEF
     * @param {TeqFw_Web_Front_Api_Gate_IErrorHandler} errHndl
     * @param {TeqFw_Web_Api_Front_Api_Request_Alert} errAlert
     * @param {TeqFw_Web_Front_Api_Mod_Server_Connect_IState} state
     * @param {TeqFw_Web_Front_Mod_Config} modCfg
     * @param {typeof TeqFw_Web_Api_Shared_Api_Request} Request
     */
    constructor(
        {
            TeqFw_Web_Api_Front_Defaults$: DEF,
            TeqFw_Web_Front_Api_Gate_IErrorHandler$: errHndl,
            TeqFw_Web_Api_Front_Api_Request_Alert$: errAlert,
            TeqFw_Web_Front_Api_Mod_Server_Connect_IState$: state,
            TeqFw_Web_Front_Mod_Config$: modCfg,
            ['TeqFw_Web_Api_Shared_Api_Request#']: Request,
        }
    ) {
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
         * @returns {Promise<*>}
         */
        this.send = async function (data, endpoint, opts = null) {
            // start displaying a network activity led on UI
            state.startActivity();
            const req = new Request();
            // TODO: we need to have pre & post processing of the request/response
            try {
                req.data = data;
                // endpoint name is a route: App_Shared_Web_Api_Endpoint
                const route = endpoint.constructor.name;
                const URL = `${getBaseUrl()}/${route}`;
                /** @type {Response} */
                const res = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(req)
                });
                if ((res.status >= 200) && (res.status < 300)) {
                    try {
                        const text = await res.text();
                        /** @type {TeqFw_Web_Api_Shared_Api_Response} */
                        const json = JSON.parse(text);
                        if (!json.error) return endpoint.createRes(json.data);
                        else errHndl.error(json.error);
                    } catch (e) {
                        errHndl.error(e);
                    }
                } else {
                    const msg = `The wrong HTTP status of the response: ${res.status}.`;
                    errAlert.error(msg, req, res);
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
