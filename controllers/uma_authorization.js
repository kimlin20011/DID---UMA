const deploy = require("../models/uma/deployAuthorizationContract");
const setProtectedResource = require("../models/uma/setProtectedResourceDID");
const setPolicy = require("../models/uma/setPolicy");
const requestRegister = require("../models/uma/requestRegister");
const accessAuthorize = require("../models/uma/accessAuthorize");


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
  async setPolicy(ctx) {
    let formData = ctx.request.body;
    let res = {};
    try {
      let result = await setPolicy(formData);
      res = result;
      ctx.body = res;
    } catch (error) {
      ctx.body = error;
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
}