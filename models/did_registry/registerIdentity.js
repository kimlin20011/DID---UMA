"use strict";
const fs = require("fs");
const config = require("../../configs/config");
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require("web3");
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const { Base64 } = require("js-base64");
const unlockAccount = require("../accountUnlock");

module.exports = async function registerIdentity(data) {
  let Registry_Abi = config.DIDRegistry.abi;
  let nowAccount = data.account;
  let _identity = data.identity;
  console.log(`_identity:${_identity}`)
  let _url = data.url;
  let _url_base64_encode = await Base64.encode(_url);
  let _url_base64_encode_hex_encode = await web3.utils.utf8ToHex(
    _url_base64_encode
  );
  let registryAddress = data.registryAddress;
  let password = data.password;
  let Registry = new web3.eth.Contract(Registry_Abi, registryAddress);
  // 解鎖
  let unlock = await unlockAccount(nowAccount, password);
  if (!unlock) {
    console.log(`not unlock`);
    return;
  }

  return new Promise((resolve, reject) => {
    let result = {};
    Registry.methods
      .registerIdentity(_identity, _url_base64_encode_hex_encode)
      .send({
        from: nowAccount,
        gas: 3000000
      })
      .on("receipt", function(receipt) {
        result.event = receipt.events.Registered.returnValues;
        //result.name = receipt.events.addedResourceSet.returnValues.name;
        result.status = true;
        let result_event = JSON.stringify(result);
        //fs.writeFileSync('./identifier.json', result_event);
        resolve(result);
      })
      .on("error", function(error) {
        result.info = `智能合約registerIdentity操作失敗`;
        result.error = error.toString();
        result.status = false;
        console.log(result);
        reject(result);
      });
  });
};
