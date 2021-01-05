"use strict";
const fs = require("fs");
const config = require("../../configs/config");
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require("web3");
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const unlockAccount = require("../accountUnlock");

module.exports = async function deployAuthorization(data) {
  let Authorization_Bytecode = config.Authorization.bytecode;
  let Authorization_Abi = config.Authorization.abi;
  //取得目前geth中第一個account
  let nowAccount = "";
  let didMethod = config.did.method;
  let registryAddress = fs.readFileSync("./Registry_address.txt").toString();
  //先用第一組帳號，要用那組之後可以討論
  //await web3.eth.getAccounts((err, res) => {nowAccount = res[0]} );

  //set body
  nowAccount = data.account;
  let password = data.password;

  //let password = config.geth.password;
  let Authorization = new web3.eth.Contract(Authorization_Abi);

  // 解鎖
  let unlock = await unlockAccount(nowAccount, password);
  if (!unlock) {
    console.log(`not unlock`);
    return;
  }

  return new Promise((resolve, reject) => {
    //let RM_Address = fs.readFileSync('./RM_address.txt').toString();
    let result = {};
    Authorization.deploy({
      arguments: [registryAddress,didMethod],
      data: Authorization_Bytecode
    })
      .send({
        from: nowAccount,
        gas: 6000000
      })
      .on("error", function(error) {
        result.info = error;
        result.status = false;
        reject(result);
      })
      .on("receipt", function(receipt) {
        // 更新合約介面
        let Authorization_address = receipt.contractAddress;
        result.status = true;
        result.address = Authorization_address;
        //將新生成的RM地址寫進.txt檔案
        fs.writeFileSync("./Authorization_address.txt", Authorization_address);
        resolve(result);
      });
  });
};
