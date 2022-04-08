/**
 * Plugin initialization function.
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Api_Back_Plugin_Init';

export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Core_Shared_Logger} */
    const logger = spec['TeqFw_Core_Shared_Logger$'];

    // DEFINE INNER FUNCTIONS
    async function action() { }

    // MAIN FUNCTIONALITY
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});
    return action;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
