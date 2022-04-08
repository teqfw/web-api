/**
 * DTO to represent plugin descriptor (teqfw.json) structure
 * that is related to '@teqfw/web-api' node:
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Api_Back_Dto_Plugin_Desc';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Api_Back_Dto_Plugin_Desc
 */
class Dto {
    static namespace = NS;
    /** @type {string[]} */
    services;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_IDto
 */
export default class TeqFw_Web_Api_Back_Dto_Plugin_Desc {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Util_Cast.castArrayOfStr|function} */
        const castArrayOfStr = spec['TeqFw_Core_Shared_Util_Cast.castArrayOfStr'];

        // INSTANCE METHODS
        /**
         * @param {TeqFw_Web_Api_Back_Dto_Plugin_Desc.Dto} [data]
         * @return {TeqFw_Web_Api_Back_Dto_Plugin_Desc.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.services = castArrayOfStr(data?.services);
            return res;
        }
    }
}
