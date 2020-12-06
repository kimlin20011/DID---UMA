const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || `ws://localhost:8546`);
let hex_text = `0x68747470733a2f2f72656d69782e657468657265756d2e6f72672f236f7074696d697a653d66616c73652665766d56657273696f6e3d6e756c6c2676657273696f6e3d736f6c6a736f6e2d76302e372e302b636f6d6d69742e39653631663932622e6a732672756e733d323030`;
let Stg = web3.utils.hexToUtf8(hex_text);

console.log(web3.utils.isHex(hex_text));
console.log(Stg);
