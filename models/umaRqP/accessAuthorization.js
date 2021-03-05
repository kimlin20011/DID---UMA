"use strict";
const fs = require("fs");
//const config = require("../../configs/config");
const request = require('request');

module.exports = async function sign(data) {

    return new Promise((resolve, reject) => {
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
            let token = JSON.stringify(body.accessToken);
            fs.writeFileSync('./accessToken.txt', token);
            resolve(result);
        });
    });
};



  // $.post(
    //     asURL,
    //     {
    //         rqpId: nowAccount,
    //         ticketCrypto: ticketSigned,
    //         ticket: ticket,
    //         didMethod: `ethr`,
    //     },
    //     function (result) {
    //         if (result.status === true) {
    //             console.log(result);
    //             alert(`Access authorization success`);
    //             doneTransactionStatus();
    //         } else {
    //             console.log(`update failed`);
    //             console.log(result);
    //             doneTransactionStatus();
    //             alert(`Access authorization failed`);
    //         }
    //     }
    // );