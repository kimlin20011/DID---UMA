"use strict";
const fs = require('fs');
const config = require('../../configs/config');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const unlockAccount = require('../accountUnlock');

module.exports = async function verifyUrl(data) {
    let Registry_Bytecode = config.DIDRegistry.bytecode;
    let Registry_Abi = config.DIDRegistry.abi;
    let nowAccount =data.account;
    let _identity = data.identity;
    let _url = data.url;
    let registryAddress = data.registryAddress;
    let Registry = new web3.eth.Contract(Registry_Abi,registryAddress);

    return new Promise((resolve, reject) => {
        Registry.methods.verifyUrl(_identity,_url).call()
            .then((return_result) => {
                //console.log(`return_result: ${return_result}`);
                resolve(return_result);
            })
            .catch(function(err) {
            console.log(err);
            reject(err);
        });
    });
};