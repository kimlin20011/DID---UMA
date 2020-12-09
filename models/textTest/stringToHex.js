const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || `ws://localhost:8546`);

let Hex1 = web3.utils.utf8ToHex(
  "http://localhost:3001/DIDDocument/?did=0x6894b3c5bfe044ec23d716eb7848824513f8c978"
);
console.log(Hex1);
console.log(`length: ${Hex1.length}`);

// let bytes = web3.utils.hexToBytes(Hex1);
// console.log(bytes);

// let Hex2 = web3.utils.bytesToHex(bytes);
// console.log(Hex2);

// let Stg = web3.utils.hexToUtf8(Hex2);
// console.log(Stg);
