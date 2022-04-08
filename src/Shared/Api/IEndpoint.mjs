/**
 * Endpoint object creates requests and responses DTOs and provides route's address.
 * @interface
 */
export default class TeqFw_Web_Api_Shared_Api_IEndpoint {
    /**
     * @param {Object|null} data
     * @return {Object}
     */
    createReq(data = null) {}

    /**
     * @param {Object|null} data
     * @return {Object}
     */
    createRes(data = null) {}

    /**
     * Get route to the service inside plugin's realm.
     * @return {string}
     */
    getRoute() {}
}
