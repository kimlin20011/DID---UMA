"use strict";
const fs = require("fs");
const config = require("../../configs/config");
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require("web3");
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const unlockAccount = require("../accountUnlock");

module.exports = async function setPolicy(data) {
  let Authorization_Abi = config.Authorization.abi;
  let nowAccount = data.account;
  let password = data.password;
  let issuer = data.issuerAddress;
  let resourceIdentity = data.resourceIdentity;
  let claimByte = web3.utils.utf8ToHex(
      data.claim
      );
  let expireDate =config.Authorization.expireDate;
  let AuthorizationAddress = fs
    .readFileSync("./Authorization_address.txt")
    .toString();
  let Authorization = new web3.eth.Contract(
    Authorization_Abi,
    AuthorizationAddress
  );
  // 解鎖
  let unlock = await unlockAccount(nowAccount, password);
  if (!unlock) {
    console.log(`not unlock`);
    return;
  }

  return new Promise((resolve, reject) => {
    let result = {};
    Authorization.methods
      .setPolicy(resourceIdentity,issuer,claimByte,expireDate)
      .send({
        from: nowAccount,
        gas: 3000000
      })
      .on("receipt", function(receipt) {
        result.event = receipt.events.PolicyRegistered.returnValues;
        //result.name = receipt.events.addedResourceSet.returnValues.name;
        result.status = true;
        resolve(result);
      })
      .on("error", function(error) {
        result.info = `智能合約setPolicy操作失敗`;
        result.error = error.toString();
        result.status = false;
        console.log(result);
        reject(result);
      });
  });
};
