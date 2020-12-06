"use strict";
const fs = require('fs');
const config = require('../../configs/config');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const unlockAccount = require('../accountUnlock');

module.exports = async function registryDeploy(data){
    let Registry_Bytecode = config.DIDRegistry.bytecode;
    let Registry_Abi = config.DIDRegistry.abi;
    //取得目前geth中第一個account
    let nowAccount ="";
    //先用第一組帳號，要用那組之後可以討論
    //await web3.eth.getAccounts((err, res) => {nowAccount = res[0]} );

    //set body
    nowAccount = data.account;
    let password = data.password;

    //let password = config.geth.password;
    let Registry = new web3.eth.Contract(Registry_Abi);

    // 解鎖
    let unlock = await unlockAccount(nowAccount,password);
    if (!unlock) {
        console.log(`not unlock`);
        return;
    }

    return new Promise((resolve, reject) => {
        //let RM_Address = fs.readFileSync('./RM_address.txt').toString();
        let result ={};
        Registry
            .deploy({
                data: Registry_Bytecode,
            })
            .send({
                from: nowAccount,
                gas: 6000000
            })
            .on('error', function(error){
                result.info = error;
                result.status = false;
                reject(result);
            })
            .on("receipt", function(receipt) {
                // 更新合約介面
                let Registry_address = receipt.contractAddress;
                result.status = true;
                result.address = Registry_address;
                //將新生成的RM地址寫進.txt檔案
                fs.writeFileSync('./Registry_address.txt', Registry_address);
                resolve(result);
            })
    });
};