/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class TeqFw_Web_Api_Shared_Defaults {

    NAME = '@teqfw/web-api'; // plugin's node in 'teqfw.json' & './cfg/local.json'

    // URL prefix for API requests: https://.../door/space/...
    SPACE_SERVICE = 'web-api-service';

    constructor() {
        Object.freeze(this);
    }
}
