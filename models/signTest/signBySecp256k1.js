const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || `ws://localhost:8546`);
const secp256k1 = require(`secp256k1`);
const EthCrypto = require("eth-crypto");
const { randomBytes } = require("crypto");
const message = `test_123`;

let privKey;
do {
  privKey = randomBytes(32);
} while (!secp256k1.privateKeyVerify(privKey));

let prefix = "\x19Ethereum Signed Message:\n32"; //這一段不一定要加
let sha3_messageHash = web3.utils.soliditySha3(prefix, message);
let byte32_sha3_messageHash = web3.utils.hexToBytes(sha3_messageHash);

let buf_shaMessageHash = Buffer.from(byte32_sha3_messageHash);
let buf_PvK = Buffer.from(privKey);

let sig = secp256k1.ecdsaSign(buf_shaMessageHash, buf_PvK);
const sigObject = {};
sigObject.r = sig.signature.slice(0, 32);
sigObject.s = sig.signature.slice(32, 64);
sigObject.v = sig.recovery + 27;
console.log(sigObject);
console.log(sig.toString());
console.log(`${privKey}`);
