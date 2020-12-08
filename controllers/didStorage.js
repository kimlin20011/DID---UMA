const fs = require("fs");

module.exports = {
  async getDucument(ctx) {
    //console.log(ctx.query);
    let formData = {};
    formData.identity = ctx.query.did;
    try {
      let doc_json = await fs.readFileSync(
        `./DID_storage/${formData.identity}.json`
      );
      let docData = JSON.parse(doc_json);
      ctx.body = docData;
    } catch (error) {
      ctx.body = error;
    }
  }
};
