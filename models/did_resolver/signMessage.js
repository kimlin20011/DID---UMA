"use strict";
const config = require("../../configs/config");
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require("web3");
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);

module.exports = async function signMessage(issuer, identity, nonce) {
  //issuer, identity, nonce
  let message = issuer + identity + nonce;
  console.log(message);
  console.log(issuer);
  console.log(identity);
  return web3.eth.personal
    .sign(message, issuer, "nccutest") // config.geth.password
    .then(_signature => {
      return _signature;
    })
    .catch(function(err) {
      return err;
    });
};
