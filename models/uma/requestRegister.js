"use strict";
const fs = require("fs");
const config = require("../../configs/config");
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require("web3");
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const unlockAccount = require("../accountUnlock");

module.exports = async function requestRegister(data) {
  let Authorization_Abi = config.Authorization.abi;
  let nowAccount = data.account;
  let resourceIdentity = data.resourceIdentity;
  let didMethod = data.didMethod;
  let AuthorizationAddress = fs
    .readFileSync("./Authorization_address.txt")
    .toString();
  let password = data.password;
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
      .ticketGenerate(resourceIdentity,didMethod)
      .send({
        from: nowAccount,
        gas: 3000000
      })
      .on("receipt", function(receipt) {
        result.event = receipt.events.TicketGenerated.returnValues;
        //result.name = receipt.events.addedResourceSet.returnValues.name;
        result.status = true;
        resolve(result);
      })
      .on("error", function(error) {
        result.info = `智能合約ticketGenerate操作失敗`;
        result.error = error.toString();
        result.status = false;
        console.log(result);
        reject(result);
      });
  });
};
