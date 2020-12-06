const deployRegistry = require('../models/did_registry/deployRegistry');

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
};