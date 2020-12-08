const deployRegistry = require('../models/did_registry/deployRegistry');
const register_Identity = require('../models/did_registry/registerIdentity');
const set_DocumentInfo = require('../models/did_registry/setDocumentInfo');

module.exports = {
    async deploy(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let deploy_result = await deployRegistry(formData);
            res = deploy_result;
            ctx.body = res;
        } catch(error) {
            ctx.body = error;
        }
    },
    async registerIdentity(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let registerIdentity_result = await register_Identity(formData);
            res = registerIdentity_result;
            ctx.body = res;
        } catch(error) {
            ctx.body = error;
        }
    },
    async setDocumentInfo(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let result = await set_DocumentInfo(formData);
            res = result;
            ctx.body = res;
        } catch(error) {
            ctx.body = error;
        }
    },
};