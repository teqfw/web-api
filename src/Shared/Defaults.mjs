/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class TeqFw_Web_Api_Shared_Defaults {

    NAME = '@teqfw/web-api'; // plugin's node in 'teqfw.json' & './cfg/local.json'

    // URL prefix for API requests: https://.../door/space/...
    SPACE_API = 'api';

    WAPI_ALIVE = '/alive';
    WAPI_FRONT_REGISTER = '/front/register';
    WAPI_FRONT_LOG_COLLECT = '/front/log/collect';
    WAPI_LOAD_CONFIG = '/load/config';
    WAPI_LOAD_FILES_TO_CACHE = '/load/files_to_cache';
    WAPI_LOAD_NAMESPACES = '/load/namespaces';

    constructor() {
        Object.freeze(this);
    }
}
