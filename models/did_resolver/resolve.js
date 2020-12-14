"use strict";
const request = require("request");

module.exports = async function resolve(_url) {
  return new Promise((resolve, reject) => {
    //let result = {};
    request.get(
      {
        url: _url,
        //body: result,
        json: true
      },
      function(err, httpResponse, body) {
        if (err) {
          reject(err);
        }
        resolve(body);
      }
    );
  });
};
