const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || `ws://localhost:8546`);

let Hex1 = web3.utils.utf8ToHex(
  "http://localhost:3001/DIDDocument/?did=0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
);
console.log(Hex1);
console.log(`length: ${Hex1.length}`);

// let bytes = web3.utils.hexToBytes(Hex1);
// console.log(bytes);

// let Hex2 = web3.utils.bytesToHex(bytes);
// console.log(Hex2);

// let Stg = web3.utils.hexToUtf8(Hex2);
// console.log(Stg);
