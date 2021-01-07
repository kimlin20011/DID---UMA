"use strict";
//const fs = require("fs");
const config = require("../../configs/config");
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require("web3");
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const unlockAccount = require("../accountUnlock");

module.exports = async function sign(data) {
  let nowAccount = data.account;
  let password = data.password;
  let text = data.text;

  return new Promise((resolve, reject) => {
    web3.eth.personal
      .sign(text, nowAccount, password)
      .then(result => {
        resolve(result);
      })
      .catch(function(err) {
        console.log(err);
        reject(err);
      });
  });
};