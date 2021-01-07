"use strict";
const fs = require("fs");
const config = require("../../configs/config");
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require("web3");
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const unlockAccount = require("../accountUnlock");
const EthCrypto = require('eth-crypto');

module.exports = async function tokenIntrospect(data) {
  let Authorization_Abi = config.Authorization.abi;
  let token = data.token;
  let tokenSignature = data.tokenSignature;
  let AuthorizationAddress = fs
    .readFileSync("./Authorization_address.txt")
    .toString();
  let Authorization = new web3.eth.Contract(
    Authorization_Abi,
    AuthorizationAddress
  );
  let vrs = EthCrypto.vrs.fromString(tokenSignature.toString());

  return new Promise((resolve, reject) => {
    Authorization.methods
      .TokenIntrospect(token,vrs.v,vrs.r,vrs.s)
      .call()
      .then(return_result => {
        //console.log(`return_result: ${return_result}`);
        // hex to string
        console.log(`return_result:${return_result}`)
        resolve(return_result);
      })
      .catch(function(err) {
        console.log(err);
        reject(err);
      });
  });
};
