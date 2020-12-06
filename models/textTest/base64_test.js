const { Base64 } = require("js-base64");

let url = `https://www.npmjs.com/package/js-base64`;
let url_base64Encode = Base64.encode(url);
let url_base64Decode = Base64.decode(url_base64Encode);

console.log(`url: ${url}`);
console.log(`url_base64Encode: ${url_base64Encode}`);
console.log(`url_base64Decode: ${url_base64Decode}`);
