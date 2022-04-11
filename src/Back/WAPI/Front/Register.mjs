/**
 * Web API service to register newly installed front on server.
 * We should save public key for asymmetric encryption before we open reverse Events Stream.
 *
 * @namespace TeqFw_Web_Api_Back_WAPI_Front_Register
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Api_Back_WAPI_Front_Register';

/**
 * @implements TeqFw_Web_Api_Back_Api_Factory_IService
 */
export default class TeqFw_Web_Api_Back_WAPI_Front_Register {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Api_Shared_WAPI_Front_Register} */
        const endpoint = spec['TeqFw_Web_Api_Shared_WAPI_Front_Register$'];
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Web_Back_Act_Front_Create.act|function} */
        const actCreate = spec['TeqFw_Web_Back_Act_Front_Create$'];

        // INSTANCE METHODS
        this.getEndpoint = () => endpoint;

        this.getService = function () {
            // FUNCS
            /**
             * @param {TeqFw_Web_Api_Back_Mod_Request_Context} context
             */
            async function service(context) {
                /** @type {TeqFw_Web_Api_Shared_WAPI_Front_Register.Request} */
                const req = context.getInData();
                /** @type {TeqFw_Web_Api_Shared_WAPI_Front_Register.Response} */
                const res = context.getOutData();
                const trx = await rdb.startTransaction();
                try {
                    const {id} = await actCreate({trx, keyPub: req.publicKey, uuid: req.uuid});
                    await trx.commit();
                    res.frontId = id;
                } catch (e) {
                    console.log(e);
                    await trx.rollback();
                    throw e;
                }
            }

            // MAIN
            Object.defineProperty(service, 'namespace', {value: NS});
            return service;
        }
    }

}
