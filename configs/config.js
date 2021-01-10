//下指令編譯新合約 solcjs -o ./ --bin --abi FourPattern_Two.sol
const fs = require("fs");
require("dotenv").config();

//讀進合約abi,bytecode
const Registry_Abi = JSON.parse(
  fs.readFileSync("./migrates/DIDRegistry.abi").toString()
);
const Registry_Bytecode =
  "0x" + fs.readFileSync("./migrates/DIDRegistry.bin").toString();

//讀進合約abi,bytecode
const Authorization_Abi = JSON.parse(
  fs.readFileSync("./migrates/Authorization.abi").toString()
);
const Authorization_Bytecode =
  "0x" + fs.readFileSync("./migrates/Authorization.bin").toString();

module.exports = {
  port: 3001,
  DIDRegistry: {
    abi: Registry_Abi,
    bytecode: Registry_Bytecode
  },
  Authorization: {
    abi: Authorization_Abi,
    bytecode: Authorization_Bytecode
  },
  did: {
    method: `ethr`,
    context: `https://w3id.org/did/v1`,
    issuer: `0x6894b3c5bfe044ec23d716eb7848824513f8c978`,
    publicKey: {
      type: "Secp256k1VerificationKey2018"
    },
    expire: 365, //days
    signature: {
      type: "Secp256k1SignatureAuthentication2018"
    },
    ownerName: "KanazawaUniversity",
    nationality: `Japan`
  },
  geth: {
    account: `0x6894b3c5bfe044ec23d716eb7848824513f8c978`,
    //account: `0xdfbc7a1f5f867a9fd73d9fbe9da2b5b34ea67d95`,
    rqp_account: `0x6894b3c5bfe044ec23d716eb7848824513f8c978`,
    //暫時不用
    password: process.env.password,
    gethWebsocketUrl: `ws://localhost:8546`,
    //keystoreDir:`C:\\Users\\nccu\\implement\\chain_new\\data\\keystore`
    keystoreDir: `/Users/nccu/Documents/implement/chain_new/data/keystore`
  }
};
