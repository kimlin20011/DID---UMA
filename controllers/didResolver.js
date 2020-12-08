const getDIDUrl = require("../models/did_registry/getDIDsDocumentUrls");
const resolve = require("../models/did_resolver/resolve");

module.exports = {
  async resolve(ctx) {
    //console.log(ctx.query);
    let formData = {};
    formData.identity = ctx.query.did;
    //console.log(formData.identity);
    //let DID_Url;
    try {
      let DID_Url = await getDIDUrl(formData);
      //second, get did document from url
      let DID_Document = await resolve(DID_Url);
      ctx.body = DID_Document;
    } catch (error) {
      ctx.body = error;
    }
  }
};
