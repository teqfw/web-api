/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class TeqFw_Web_Api_Front_Defaults {

    /** @type {TeqFw_Web_Api_Shared_Defaults} */
    SHARED;

    /**
     * @param {TeqFw_Web_Api_Shared_Defaults} SHARED
     */
    constructor(
        {
            TeqFw_Web_Api_Shared_Defaults$: SHARED,
        }
    ) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Api_Shared_Defaults} */
        this.SHARED = SHARED;

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
