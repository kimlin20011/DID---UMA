"use strict";
//const request = require("request");
const fs = require("fs");
const config = require("../../configs/config");
const sign = require("./signClaim");

module.exports = async function createResoruceDID(data) {
  let now_timestamp = new Date().getTime();
  let now = Math.floor(now_timestamp / 1000);
  //let now_timestamp = Math.floor(dateTime / 1000);
  //let Registry_Abi = config.DIDRegistry.abi;
  let _identity = data.identity;
  let _name = data.resourceName;
  let _owner = data.owner;
  let url = `http://localhost:3001/DIDDocument/?did=${_identity}`;
  let expire_time = now + config.did.expire * 31536000;
  let randomID = Math.floor(Math.random() * 10000000) + 1;
  let _nonce = (Math.floor(Math.random() * 10000) + 1).toString();
  //let _signature = await signMessage(config.did.issuer, _identity, _nonce);
  let _signature = await sign(data);
  console.log(`_signature:${_signature}`);

  let did_info = {
    "@context": config.did.context,
    id: _identity,
    issuer: `did:${config.did.method}:${_owner}`,
    publicKey: [
      {
        id: `did:${config.did.method}:${_identity}#controller`,
        type: config.did.publicKey.type,
        controller: `did:${config.did.method}:${_identity}`,
        ethereumAddress: _identity
      }
    ],
    claim: {
      owner: `${_owner}`,
      name: `${_name}`,
      resourceID: randomID,
      allowenceStatus: 1,
      expire: expire_time
    },
    signautre: [
      {
        type: config.did.signature.type,
        publicKey: `did:${config.did.method}:${_owner}`,
        nonce: _nonce,
        signaturevalue: _signature
      }
    ]
  };

  return new Promise((resolve, reject) => {
    let result = {};
    result.url = url;
    result.document = did_info;
    result.status = true;
    let data = JSON.stringify(result.document);
    fs.writeFileSync(`./DID_storage/${_identity}.json`, data);
    resolve(result);
  });
};
