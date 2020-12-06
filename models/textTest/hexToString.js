const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || `ws://localhost:8546`);
let hex_text = `0x68747470733a2f2f62756d612e636f6d2f`;
let Stg = web3.utils.hexToUtf8(hex_text);

console.log(web3.utils.isHex(hex_text));
console.log(Stg);
