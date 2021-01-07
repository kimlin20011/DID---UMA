const sign = require("../models/umaRqP/sign");


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
}