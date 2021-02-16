"use strict";
const db = require("../connectionDB");

module.exports = async function getExistUser() {
    return new Promise((resolve, reject) => {
        let result = {};
        let sql = `SELECT * FROM user_dids`;
        db.query(sql, function (err, rows) {
            if (err) {
                //console.log(err);
                result.dbInfo = "DB error";
                result.err = err;
                result.status = false;
                reject(result);
            }
            result.info = rows;
            result.status = true;
            console.log(result);
            resolve(result);
        });
    });
};
