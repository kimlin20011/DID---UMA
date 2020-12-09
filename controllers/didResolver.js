const getDIDUrl = require("../models/did_registry/getDIDsDocumentUrls");
const resolve = require("../models/did_resolver/resolve");
const config = require("../configs/config");

module.exports = {
  async resolve(ctx) {
    let formData = {};
    let did = ctx.query.did;
    let did_info = did.split(":");
    let reslove_result = {};

    if (did_info[0] != "did") {
      console.log(`not did format`);
      reslove_result.msg = `not did format`;
      reslove_result.status = false;
      ctx.body = reslove_result;
    } else if (did_info[1] != config.did.method) {
      console.log(`not supportting DID method`);
      reslove_result.msg = `not supportting DID method`;
      reslove_result.status = false;
      ctx.body = reslove_result;
    } else {
      try {
        formData.identity = did_info[2];
        //first, get did url from registry contract
        let DID_Url = await getDIDUrl(formData);
        //second, get did document from url
        let DID_Document = await resolve(DID_Url);
        ctx.body = DID_Document;
      } catch (error) {
        ctx.body = error;
      }
    }
  }
};
