const deployRegistry = require('../models/did_registry/deployRegistry');
const register_Identity = require('../models/did_registry/registerIdentity');
const set_DocumentInfo = require('../models/did_registry/setDocumentInfo');
const verify_Url = require('../models/did_registry/verifyUrl');
const verify_Document = require('../models/did_registry/verifyDocument');
const DIDs_DocumentUrls = require('../models/did_registry/getDIDsDocumentUrls');


module.exports = {
    async deploy(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let result = await deployRegistry(formData);
            res = result;
            ctx.body = res;
        } catch(error) {
            ctx.body = error;
        }
    },
    async registerIdentity(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let result = await register_Identity(formData);
            res = result;
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
    async verifyUrl(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let result = await verify_Url(formData);
            res = result;
            ctx.body = res;
        } catch(error) {
            ctx.body = error;
        }
    },
    async verifyDocument(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let result = await verify_Document(formData);
            res = result;
            ctx.body = res;
        } catch(error) {
            ctx.body = error;
        }
    },
    async DIDsDocumentUrls(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let result = await DIDs_DocumentUrls(formData);
            res = result;
            ctx.body = res;
        } catch(error) {
            ctx.body = error;
        }
    },
};