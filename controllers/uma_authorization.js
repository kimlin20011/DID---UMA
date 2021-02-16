const deploy = require("../models/uma/deployAuthorizationContract");
const setProtectedResource = require("../models/uma/setProtectedResourceDID");
const setPolicy = require("../models/uma/setPolicy");
const requestRegister = require("../models/uma/requestRegister");
const accessAuthorize = require("../models/uma/accessAuthorize");
const tokenIntrospect = require("../models/uma/tokenIntrospect");
const registerResource = require("../models/authorizationServer/registerResource");
const config = require("../configs/config");

module.exports = {
  async deploy(ctx) {
    let formData = ctx.request.body;
    let res = {};
    try {
      let result = await deploy(formData);
      res = result;
      ctx.body = res;
    } catch (error) {
      ctx.body = error;
    }
  },
  async setProtectedResource(ctx) {
    let formData = ctx.request.body;
    let res = {};
    try {
      let result = await setProtectedResource(formData);
      res = result;
      ctx.body = res;
    } catch (error) {
      ctx.body = error;
    }
  },
  async registerResource(ctx) {
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
      ctx.body = result;
    } else {
      try {
        formData.identity = did_info[2];
        //first, get did url from registry contract
        result.res = await registerResource(formData);
        result.status = true;
        ctx.body = result;
      } catch (error) {
        result.status = false;
        result.res = error;
        ctx.body = result;
      }
    }
  },
  async setPolicy(ctx) {
    let formData = ctx.request.body;
    let issuerDID = formData.issuer;
    let resourceDID = formData.resourceIdentity;
    let issuerDID_info = issuerDID.split(":");
    let resourceDID_info = resourceDID.split(":");
    let result = {};

    if (issuerDID_info[0] != "did" || resourceDID_info[0] != "did") {
      console.log(`not did format`);
      result.msg = `not did format`;
      result.status = false;
      ctx.body = result;
    } else if (issuerDID_info[1] != config.did.method || resourceDID_info[1] != config.did.method) {
      console.log(`not supportting DID method`);
      result.msg = `not supportting DID method`;
      result.status = false;
      ctx.body = result;
    } else {
      try {
        formData.issuerAddress = issuerDID_info[2];
        formData.resourceIdentity = resourceDID_info[2];
        //first, get did url from registry contract
        result.res = await setPolicy(formData);
        result.status = true;
        ctx.body = result;
      } catch (error) {
        result.status = false;
        result.res = error;
        ctx.body = result;
      }
    }
  },
  async requestRegister(ctx) {
    let formData = ctx.request.body;
    let res = {};
    try {
      let result = await requestRegister(formData);
      res = result;
      ctx.body = res;
    } catch (error) {
      ctx.body = error;
    }
  },
  async accessAuthorize(ctx) {
    let formData = ctx.request.body;
    let res = {};
    try {
      let result = await accessAuthorize(formData);
      res = result;
      ctx.body = res;
    } catch (error) {
      ctx.body = error;
    }
  },
  async tokenIntrospect(ctx) {
    let formData = ctx.request.body;
    let res = {};
    try {
      let result = await tokenIntrospect(formData);
      res = result;
      ctx.body = res;
    } catch (error) {
      ctx.body = error;
    }
  },
  //request by client
  async AuthorizationAccess(ctx) {
    //recieve ticket, signTicket, RqP_DID 
    //first, resolve did to get the claim by did resolver
    //second, send the claim, ticket, signTicket, RqP_DID to the smart contract
    let formData = ctx.request.body;
    let res = {};
    try {
      let result = await tokenIntrospect(formData);
      res = result;
      ctx.body = res;
    } catch (error) {
      ctx.body = error;
    }
  },
}