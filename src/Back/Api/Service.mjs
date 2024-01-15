/**
 * Interface for service used in 'TeqFw_Web_Api_Back_Web_Handler_Service'.
 * @interface
 */
export default class TeqFw_Web_Api_Back_Api_Service {
    /**
     * Endpoint to create DTOs for request & response for API service.
     * @returns {TeqFw_Web_Api_Shared_Api_Endpoint}
     */
    getEndpoint();

    /**
     * Optional method to initialize server on startup.
     */
    async init();

    /**
     * Process API request
     * @param {*} req
     * @param {*} res
     * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
     */
    async process(req, res, context);
}
