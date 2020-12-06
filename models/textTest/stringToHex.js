const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || `ws://localhost:8546`);

let Hex1 = web3.utils.utf8ToHex(
  "https://buma.com/"
);
console.log(Hex1);
console.log(`length: ${Hex1.length}`);

// let bytes = web3.utils.hexToBytes(Hex1);
// console.log(bytes);

// let Hex2 = web3.utils.bytesToHex(bytes);
// console.log(Hex2);

// let Stg = web3.utils.hexToUtf8(Hex2);
// console.log(Stg);
