const deployRegistry = require("../models/did_registry/deployRegistry");
const register_Identity = require("../models/did_registry/registerIdentity");
const set_DocumentInfo = require("../models/did_registry/setDocumentInfo");
const verify_Url = require("../models/did_registry/verifyUrl");
const verify_Document = require("../models/did_registry/verifyDocument");
const DIDs_DocumentUrls = require("../models/did_registry/getDIDsDocumentUrls");
const url_update = require("../models/did_registry/changeDIDDocumentUrl");
const revoke_DID = require("../models/did_registry/revokeDID");
const config = require("../configs/config");

module.exports = {
  async deploy(ctx) {
    let formData = ctx.request.body;
    let res = {};
    try {
      let result = await deployRegistry(formData);
      res = result;
      ctx.body = res;
    } catch (error) {
      ctx.body = error;
    }
  },
  async registerIdentity(ctx) {
    let formData = ctx.request.body;
    let did = formData.identity;
    let did_info = did.split(":");
    let result = {};

    if (did_info[0] != "did") {
      console.log(`not did format`);
      result.msg = `not did format`;
      result.status = false;
      ctx.body = result;
    } else if (did_info[1] != config.did.method) {
      console.log(`not supportting DID method`);
      result.msg = `not supportting DID method`;
      result.status = false;
      ctx.body = reslove_result;
    } else {
      try {
        formData.identity = did_info[2];
        //first, get did url from registry contract
        result.res = await register_Identity(formData);
        result.status = true;
        ctx.body = result;
      } catch (error) {
        result.status = false;
        result.res = error;
        ctx.body = result;
      }
    }
  },
  async setDocumentInfo(ctx) {
    let formData = ctx.request.body;
    let res = {};
    try {
      let result = await set_DocumentInfo(formData);
      res = result;
      ctx.body = res;
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      ctx.body = error;
    }
  },
  async urlUpdate(ctx) {
    let formData = ctx.request.body;
    did = formData.identity;
    let did_info = did.split(":");
    let result = {};

    if (did_info[0] != "did") {
      console.log(`not did format`);
      result.msg = `not did format`;
      result.status = false;
      ctx.body = result;
    } else if (did_info[1] != config.did.method) {
      console.log(`not supportting DID method`);
      result.msg = `not supportting DID method`;
      result.status = false;
      ctx.body = reslove_result;
    } else {
      try {
        formData.identity = did_info[2];
        //first, get did url from registry contract
        result.res = await url_update(formData);
        result.status = true;
        ctx.body = result;
      } catch (error) {
        result.status = false;
        result.res = error;
        ctx.body = result;
      }
    }
  },
  async revokeDID(ctx) {
    let formData = ctx.request.body;
    did = formData.identity;
    let did_info = did.split(":");
    let result = {};

    if (did_info[0] != "did") {
      console.log(`not did format`);
      result.msg = `not did format`;
      result.status = false;
      ctx.body = result;
    } else if (did_info[1] != config.did.method) {
      console.log(`not supportting DID method`);
      result.msg = `not supportting DID method`;
      result.status = false;
      ctx.body = reslove_result;
    } else {
      try {
        formData.identity = did_info[2];
        //first, get did url from registry contract
        result.res = await revoke_DID(formData);
        result.status = true;
        ctx.body = result;
      } catch (error) {
        result.status = false;
        result.res = error;
        ctx.body = result;
      }
    }
  }
};
