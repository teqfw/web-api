/**
 * DTO to represent error in Web API response.
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Api_Shared_Api_Dto_Error';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Api_Shared_Api_Dto_Error
 */
class Dto {
    static namespace = NS;
    /** @type {string} */
    code;
    /** @type {string} */
    message;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class TeqFw_Web_Api_Shared_Api_Dto_Error {
    constructor(spec) {
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        /**
         * @param {TeqFw_Web_Api_Shared_Api_Dto_Error.Dto} [data]
         * @return {TeqFw_Web_Api_Shared_Api_Dto_Error.Dto}
         */
        this.createDto = function (data) {
            // create new DTO
            const res = new Dto();
            // cast known attributes
            res.code = castString(data?.code);
            res.message = castString(data?.message);
            return res;
        };
    }
}
