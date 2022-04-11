/**
 * Common gateway to Web API services.
 *
 * @namespace TeqFw_Web_Api_Front_App_Connect_WAPI
 */
// MODULE'S CLASSES
export default class TeqFw_Web_Api_Front_App_Connect_WAPI {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Api_Front_Defaults} */
        const DEF = spec['TeqFw_Web_Api_Front_Defaults$'];
        /** @type {TeqFw_Web_Front_Dto_Config} */
        const config = spec['TeqFw_Web_Front_Dto_Config$'];
        /** @type {TeqFw_Web_Front_Api_Gate_IErrorHandler} */
        const errHndl = spec['TeqFw_Web_Front_Api_Gate_IErrorHandler$'];
        /** @type {TeqFw_Web_Front_Api_Mod_Server_Connect_IState} */
        const modConn = spec['TeqFw_Web_Front_Api_Mod_Server_Connect_IState$'];

        // VARS
        let BASE;

        // FUNCS
        function getBaseUrl() {
            if (!BASE) {
                const schema = '//';
                const domain = config.urlBase ?? location.hostname;
                let port = location.port; // empty string for default ports (80 & 443)
                if (port !== '') port = `:${port}`
                const root = (config.root) ? `/${config.root}` : '';
                const door = (config.door) ? `/${config.door}` : '';
                const space = `/${DEF.SHARED.SPACE_API}`;
                BASE = `${schema}${domain}${port}${root}${door}${space}`;
            }
            return BASE;
        }

        // INSTANCE METHODS
        /**
         * Send API service request to backend.
         *
         * @param {Object} data JS-object to be sent as request
         * @param {TeqFw_Web_Api_Shared_Api_IEndpoint} endpoint
         * @returns {Promise<*|boolean>}
         */
        this.send = async function (data, endpoint) {
            let result = false;
            modConn.startActivity();
            try {
                const URL = `${getBaseUrl()}${endpoint.getRoute()}`;
                const res = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({data})
                });
                const text = await res.text();
                try {
                    const json = JSON.parse(text);
                    result = endpoint.createRes(json.data);
                } catch (e) {
                    errHndl.error(text);
                }
            } catch (e) {
                errHndl.error(e);
            } finally {
                modConn.stopActivity();
            }
            return result;
        }
    }
}
