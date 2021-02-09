const sign = require("../models/umaRqP/sign");
const getExistResources = require("../models/db/getExistResources");

module.exports = {
  async sign(ctx) {
    let formData = ctx.request.body;
    let res = {};
    try {
      let result = await sign(formData);
      res = result;
      ctx.body = res;
    } catch (error) {
      ctx.body = error;
    }
  },
  //get resource for client;
  async getExistResources(ctx) {
    let formData = ctx.request.body;
    let res = {};
    try {
      let result = await getExistResources(formData);
      res = result;
      ctx.body = res;
    } catch (error) {
      ctx.body = error;
    }
  }
};
