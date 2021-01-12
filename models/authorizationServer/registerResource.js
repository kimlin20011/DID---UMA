//完成事項 ->
//將資料註冊至智能合約
//將資料上傳至db

"use strict";
const fs = require("fs");
const config = require("../../configs/config");
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require("web3");
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const unlockAccount = require("../accountUnlock");
const db = require('../connectionDB');

module.exports = async function setProtectedResourceDID(data) {
  let Authorization_Abi = config.Authorization.abi;
  let nowAccount = data.account;
  let resourceIdentity = data.identity;
  let resourceName = data.resourceName;
  let AuthorizationAddress = fs.readFileSync("./Authorization_address.txt").toString();
  let password = data.password;
  let Authorization = new web3.eth.Contract(Authorization_Abi, AuthorizationAddress);
  // 解鎖
  let unlock = await unlockAccount(nowAccount, password);
  if (!unlock) {
    console.log(`not unlock`);
    return;
  }

  return new Promise((resolve, reject) => {
    let result = {};
    Authorization.methods
      .setProtectedResourceDID(resourceIdentity)
      .send({
        from: nowAccount,
        gas: 3000000
      })
      .on("receipt", function(receipt) {
        result.event = receipt.events.ProtectedResourceDIDCreated.returnValues;
        //result.name = receipt.events.addedResourceSet.returnValues.name;
        let metaData ={};
        metaData.resourceDID = resourceIdentity;
        metaData.resourceName = resourceName;

        let pre_sql=`SELECT * FROM resources WHERE resourceDID = ?`;
                db.query(pre_sql, metaData.resourceDID , function (err, rows) {
                    if (err) {
                        result.dbInfo = "資料庫更新失敗。";
                        result.err = err;
                        result.status = false;
                        reject(result);
                    }else if (rows.length === 0){
                        //若資料庫中沒有id值，直接插入
                        let sql = `INSERT INTO resources SET ?`
                        db.query(sql, metaData , function (err, rows) {
                            if (err) {
                                result.dbInfo = "資料庫insert失敗。";
                                result.err = err;
                                result.status = false;
                                reject(result);
                            }
                            result.dbInfo = "Tabel resources 更新成功。";
                            result.status = true;
                            resolve(result);
                        });
                    }else if (rows.length > 0){
                        let sql = `UPDATE resources SET ? WHERE resourceDID = ?`;
                        db.query(sql, [metaData,metaData.resourceDID] , function (err, rows) {
                            if (err) {
                                result.dbInfo = "資料庫Update失敗。";
                                result.err = err;
                                result.status = false;
                                reject(result);
                            }
                            result.dbInfo = "Tabel resources 更新成功。";
                            result.status = true;
                            resolve(result);
                        });
                    }
                });
      })
      .on("error", function(error) {
        result.info = `智能合約setProtectedResourceDID操作失敗`;
        result.error = error.toString();
        result.status = false;
        console.log(result);
        reject(result);
      });
  });
};
