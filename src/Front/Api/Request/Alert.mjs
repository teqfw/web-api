/**
 * Interface for an object that displays messages about the processing of an API request.
 * Other plugins can implement this interface to display the messages in their own way.
 *
 * @interface
 */
export default class TeqFw_Web_Api_Front_Api_Request_Alert {
    /**
     * Some error is occurred during the processing of an API request.
     * @param {string} msg
     * @param {TeqFw_Web_Api_Shared_Api_Request} req
     * @param {Response} res
     */
    error(msg, req, res) {}
}
