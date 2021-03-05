"use strict";
const fs = require("fs");
//const config = require("../../configs/config");
const request = require('request');

module.exports = async function sign(data) {

    return new Promise((resolve, reject) => {
        data.access_token = fs
            .readFileSync("./accessToken.txt")
            .toString();
        request.post({
            url: data.asURL,
            body: data,
            json: true,
        }, function (err, httpResponse, body) {
            if (err) {
                reject(err);
            }
            let result = {}
            result.status = body.status;
            //result.body = body;
            let result_event = JSON.stringify(result);
            fs.writeFileSync('./accessToken.json', body.accessToken);
            resolve(result);
        });
    });
};

