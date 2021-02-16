"use strict";
//const fs = require("fs");
const config = require("../../configs/config");
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require("web3");
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const unlockAccount = require("../accountUnlock");

module.exports = async function signClaim(data) {
    let nowAccount = data.account;
    let password = data.password;
    let claimByte = web3.utils.utf8ToHex(
        data.claim
    );
    let claimHash = web3.utils.soliditySha3({ type: 'bytes', value: claimByte });
    //console.log(`claimHash:${claimHash}`)

    return new Promise((resolve, reject) => {
        web3.eth.personal
            .sign(claimHash, nowAccount, password)
            .then(result => {
                resolve(result);
            })
            .catch(function (err) {
                console.log(err);
                reject(err);
            });
    });
};