/**
 * Web API service load DI namespaces to the front.
 *
 * @namespace TeqFw_Web_Api_Back_WAPI_Load_Namespaces
 */
// MODULE'S IMPORT
import $path from 'path';

// MODULE'S VARS
const NS = 'TeqFw_Web_Api_Back_WAPI_Load_Namespaces';

/**
 * @implements TeqFw_Web_Api_Back_Api_Factory_IService
 */
export default class TeqFw_Web_Api_Back_WAPI_Load_Namespaces {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Api_Back_Defaults} */
        const DEF = spec['TeqFw_Web_Api_Back_Defaults$'];
        /** @type {TeqFw_Core_Back_App_Init_Plugin_Registry} */
        const registry = spec['TeqFw_Core_Back_App_Init_Plugin_Registry$'];
        /** @type {TeqFw_Web_Api_Shared_WAPI_Load_Namespaces} */
        const endpoint = spec['TeqFw_Web_Api_Shared_WAPI_Load_Namespaces$'];
        /** @type {TeqFw_Web_Shared_Dto_Namespace_Item.Factory} */
        const fItem = spec['TeqFw_Web_Shared_Dto_Namespace_Item#Factory$'];
        /** @type {TeqFw_Web_Shared_Dto_Namespace_Replace.Factory} */
        const fReplace = spec['TeqFw_Web_Shared_Dto_Namespace_Replace#Factory$'];

        // DEFINE WORKING VARS / PROPS
        /** @type {TeqFw_Web_Shared_Dto_Namespace_Item[]} */
        const namespaces = getNamespaces(registry); // cache for DI namespaces
        /** @type {TeqFw_Web_Shared_Dto_Namespace_Replace[]} */
        const replaces = getReplaces(registry); // cache for frontend replaces for DI

        // FUNCS

        /**
         * Loop through all plugins and compose namespace-to-source mapping for DI container on the front.
         * (@see TeqFw_Web_Back_App_Server_Handler_Static)
         *
         * @param {TeqFw_Core_Back_App_Init_Plugin_Registry} registry
         * @return {TeqFw_Web_Shared_Dto_Namespace_Item[]}
         */
        function getNamespaces(registry) {
            const result = [];
            const plugins = registry.items();
            for (const one of plugins) {
                /** @type {TeqFw_Di_Back_Api_Dto_Plugin_Desc} */
                const desc = one.teqfw[DEF.MOD_WEB.MOD_DI.NAME];
                const item = fItem.create();
                item.ext = desc.autoload.ext;
                item.ns = desc.autoload.ns;
                item.path = $path.join('/', DEF.MOD_WEB.SHARED.SPACE_SRC, one.name);
                result.push(item);
            }
            return result;
        }

        /**
         * Loop through all plugins and compose replaces for DI container on the front.
         *
         * @param {TeqFw_Core_Back_App_Init_Plugin_Registry} registry
         * @return {TeqFw_Web_Shared_Dto_Namespace_Replace[]}
         */
        function getReplaces(registry) {
            const result = [];
            const plugins = registry.items();
            const mapDiDesc = {}; // pluginName => {}
            plugins.map((a) => {mapDiDesc[a.name] = a.teqfw[DEF.MOD_WEB.MOD_DI.NAME]});
            const levels = registry.getLevels();
            const levelKeys = Object.keys(levels).map(key => parseInt(key)); // get keys as integers
            levelKeys.sort((a, b) => a - b); // sort as numbers
            // run through the levels from bottom to top and apply replaces
            const mapReplace = {};
            for (const key of levelKeys) {
                const level = levels[key];
                for (const name of level) {
                    /** @type {TeqFw_Di_Back_Api_Dto_Plugin_Desc} */
                    const desc = mapDiDesc[name];
                    if (Array.isArray(Object.keys(desc?.replace)))
                        for (const orig of Object.keys(desc.replace)) {
                            const one = desc.replace[orig];
                            if (typeof one === 'string') {
                                mapReplace[orig] = one;
                            } else if (typeof one === 'object') {
                                if (typeof one[DEF.MOD_WEB.AREA] === 'string') {
                                    mapReplace[orig] = one[DEF.MOD_WEB.AREA];
                                }
                            }
                        }
                }
            }
            // convert object to DTO
            for (const one of Object.keys(mapReplace)) {
                const item = fReplace.create();
                item.orig = one;
                item.alter = mapReplace[one];
                result.push(item);
            }

            return result;
        }

        // INSTANCE METHODS
        this.getEndpoint = () => endpoint;

        this.getService = function () {
            // FUNCS
            /**
             *
             * @param {TeqFw_Web_Api_Back_Mod_Request_Context} context
             */
            async function service(context) {
                /** @type {TeqFw_Web_Api_Shared_WAPI_Load_Namespaces.Response} */
                const out = context.getOutData();
                out.items = namespaces;
                out.replaces = replaces;
            }

            // MAIN
            Object.defineProperty(service, 'namespace', {value: NS});
            return service;
        }
    }

}
