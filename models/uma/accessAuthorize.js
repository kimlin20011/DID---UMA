"use strict";
const fs = require("fs");
const config = require("../../configs/config");
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require("web3");
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const unlockAccount = require("../accountUnlock");
const EthCrypto = require('eth-crypto');

module.exports = async function accessAuthorize(data) {
  let Authorization_Abi = config.Authorization.abi;
  let nowAccount = data.account;
  let rqpIdentity = data.rqpIdentity;
  let ticket = data.ticket;
  let AuthorizationAddress = fs
    .readFileSync("./Authorization_address.txt")
    .toString();
  let claim = data.claim;
  let claimByte = web3.utils.utf8ToHex(
    claim
  );
  let ticketCrypto = data.ticketCrypto;
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
  let vrs = EthCrypto.vrs.fromString(ticketCrypto.toString());

  return new Promise((resolve, reject) => {
    let result = {};
    Authorization.methods
      .accessAuthorize(ticket, vrs.v, vrs.r, vrs.s, claimByte, rqpIdentity)
      .send({
        from: nowAccount,
        gas: 3000000
      })
      .on("receipt", function (receipt) {
        result.event = receipt.events.TokenReleased.returnValues;
        result.status = true;
        resolve(result);
      })
      .on("error", function (error) {
        result.info = `智能合約accessAuthorize操作失敗`;
        result.error = error.toString();
        result.status = false;
        console.log(result);
        reject(result);
      });
  });
};
