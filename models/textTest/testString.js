const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || `ws://localhost:8546`);

let Hex1 = web3.utils.utf8ToHex(
  "https://remix.ethereum.org/#optimize=false&evmVersion=null&version=soljson-v0.7.0+commit.9e61f92b.js&runs=200"
);
console.log(Hex1);
console.log(`length: ${Hex1.length}`);

let bytes = web3.utils.hexToBytes(Hex1);
console.log(bytes);

let Hex2 = web3.utils.bytesToHex(bytes);
console.log(Hex2);

let Stg = web3.utils.hexToUtf8(Hex2);
console.log(Stg);
