/**
 * Interface for service used in 'TeqFw_Web_Api_Back_Web_Handler_Service'.
 * @interface
 */
export default class TeqFw_Web_Api_Back_Api_Service {
    /**
     * @returns {TeqFw_Web_Api_Shared_Api_Endpoint}
     */
    getEndpoint();

    async init();

    /**
     * Process API request
     * @param {Object} req
     * @param {Object} res
     * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
     */
    async process(req, res, context);
}
