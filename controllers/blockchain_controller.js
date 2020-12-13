const getAccounts = require("../models/getAccounts");

module.exports = {
  async getAccounts(ctx) {
    // let formData = ctx.request.body
    try {
      let accounts = await getAccounts();
      ctx.body = accounts;
    } catch (error) {
      ctx.body = error;
    }
  }
};
