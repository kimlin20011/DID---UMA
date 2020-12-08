"use strict";
const fs = require('fs');
const config = require('../../configs/config');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
//let 

module.exports = async function DIDsDocumentUrls(data) {
    let Registry_Bytecode = config.DIDRegistry.bytecode;
    let Registry_Abi = config.DIDRegistry.abi;
    let _identity = data.identity;
    //let registryAddress = data.registryAddress;
    let registryAddress = fs.readFileSync('./Registry_address.txt').toString();
    console.log(`registryAddress:${registryAddress}`);
    let Registry = new web3.eth.Contract(Registry_Abi,registryAddress);

    return new Promise((resolve, reject) => {
        Registry.methods.DIDsDocumentUrls(_identity).call()
            .then((return_result) => {
                //console.log(`return_result: ${return_result}`);
                // hex to string
                let url = web3.utils.hexToUtf8(return_result);
                resolve(url);
            })
            .catch(function(err) {
            console.log(err);
            reject(err);
        });
    });
};