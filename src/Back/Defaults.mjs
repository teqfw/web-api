/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class TeqFw_Web_Api_Back_Defaults {

    /** @type {TeqFw_Web_Back_Defaults} */
    MOD_WEB;

    /** @type {TeqFw_Web_Api_Shared_Defaults} */
    SHARED;

    /**
     * @param {TeqFw_Web_Back_Defaults} MOD_WEB
     * @param {TeqFw_Web_Api_Shared_Defaults} SHARED
     */
    constructor(
        {
            TeqFw_Web_Back_Defaults$: MOD_WEB,
            TeqFw_Web_Api_Shared_Defaults$: SHARED,
        }
    ) {
        // EXTRACT DEPS
        this.MOD_WEB = MOD_WEB;
        this.SHARED = SHARED;

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
