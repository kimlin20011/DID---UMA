const deploy = require("../models/uma/deployAuthorizationContract");

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
}