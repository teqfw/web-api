/**
 * Interface for service factory used in 'TeqFw_Web_Back_Plugin_Web_Handler_Service'.
 * @interface
 */
export default class TeqFw_Web_Api_Back_Api_Factory_IService {
    /**
     * Get object to compose request/response DTOs and to get route address.
     * @return {TeqFw_Web_Api_Shared_Api_IEndpoint}
     */
    getEndpoint() {}

    /**
     * Get service function.
     * @return {function(TeqFw_Web_Api_Back_Mod_Request_Context): Promise<void>}
     */
    getService() {}
}
