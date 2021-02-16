"use strict";
//const request = require("request");
const fs = require("fs");
const config = require("../../configs/config");
const sign = require("./signClaim");
const db = require('../connectionDB');

module.exports = async function createUserDID(data) {
    let now_timestamp = new Date().getTime();
    let now = Math.floor(now_timestamp / 1000);
    let nowAccount = data.account;
    let _identity = data.identity;
    let url = `http://localhost:3001/DIDDocument/?did=${_identity}`;
    //expire date
    let expire_time = now + config.did.expire * 31536000;
    let randomID = Math.floor(Math.random() * 100000000) + 1;
    let _nonce = (Math.floor(Math.random() * 10000) + 1).toString();
    let _signature = await sign(data);
    //for database
    let metaData = {};
    metaData.DID = data.identity;
    metaData.DID_name = data.name;

    let did_info = {
        "@context": config.did.context,
        id: _identity,
        issuer: `did:${config.did.method}:${nowAccount}`,
        publicKey: [
            {
                id: `did:${config.did.method}:${_identity}#controller`,
                type: config.did.publicKey.type,
                controller: `did:${config.did.method}:${_identity}`,
                ethereumAddress: _identity
            }
        ],
        claim: {
            claim: `${data.claim}`,
            didName: `${data.name}`,
            userID: randomID,
            allowenceStatus: 1,
            expire: expire_time
        },
        signautre: [
            {
                type: config.did.signature.type,
                publicKey: `did:${config.did.method}:${nowAccount}`,
                nonce: _nonce,
                signaturevalue: _signature
            }
        ]
    };

    return new Promise((resolve, reject) => {
        let result = {};
        let pre_sql = `SELECT * FROM user_dids WHERE DID = ?`;
        db.query(pre_sql, metaData.DID, function (err, rows) {
            if (err) {
                result.dbInfo = "資料庫更新失敗。";
                result.err = err;
                result.status = false;
                reject(result);
            } else if (rows.length === 0) {
                //若資料庫中沒有id值，直接插入
                let sql = `INSERT INTO user_dids SET ?`
                db.query(sql, metaData, function (err, rows) {
                    if (err) {
                        result.dbInfo = "資料庫insert失敗。";
                        result.err = err;
                        result.status = false;
                        reject(result);
                    }
                    result.url = url;
                    result.document = did_info;
                    let data = JSON.stringify(result.document);
                    fs.writeFileSync(`./DID_storage/${_identity}.json`, data);
                    result.dbInfo = "Tabel user_dids 更新成功。";
                    result.status = true;
                    resolve(result);
                });
            } else if (rows.length > 0) {
                let sql = `UPDATE user_dids SET ? WHERE DID = ?`;
                db.query(sql, [metaData, metaData.resourceDID], function (err, rows) {
                    if (err) {
                        result.dbInfo = "資料庫Update失敗。";
                        result.err = err;
                        result.status = false;
                        reject(result);
                    }
                    result.url = url;
                    result.document = did_info;
                    let data = JSON.stringify(result.document);
                    fs.writeFileSync(`./DID_storage/${_identity}.json`, data);
                    result.dbInfo = "Tabel user_dids 更新成功。";
                    result.status = true;
                    resolve(result);
                });
            }
        });
    });
};
