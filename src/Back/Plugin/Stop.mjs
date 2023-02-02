/**
 * Plugin finalization function.
 * @namespace TeqFw_Web_Api_Back_Plugin_Stop
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Api_Back_Plugin_Stop';

export default function (spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Core_Shared_Api_Logger} */
    const logger = spec['TeqFw_Core_Shared_Api_Logger$$']; // instance

    // FUNCS
    /**
     * @return {Promise<void>}
     * @memberOf TeqFw_Web_Api_Back_Plugin_Stop
     */
    async function action() { }

    // MAIN
    logger.setNamespace(NS);
    Object.defineProperty(action, 'namespace', {value: NS});
    return action;
}
