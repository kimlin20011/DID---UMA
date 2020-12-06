//下指令編譯新合約 solcjs -o ./ --bin --abi FourPattern_Two.sol
const fs = require("fs");
require("dotenv").config();

//讀進合約abi,bytecode
const Registry_Abi = JSON.parse(
  fs
    .readFileSync("./migrates/DIDRegistry.abi")
    .toString()
);
const Registry_Bytecode =
  "0x" +
  fs
    .readFileSync("./migrates/DIDRegistry.bin")
    .toString();

module.exports = {
  port: 3001,
  DIDRegistry: {
    abi: Registry_Abi,
    bytecode: Registry_Bytecode
  },
  geth: {
    account: `0x2cf0622bdcdb80a295669c1c1548b0601ec2c41b`,
    //account: `0xdfbc7a1f5f867a9fd73d9fbe9da2b5b34ea67d95`,
    rqp_account: `0x2cf0622bdcdb80a295669c1c1548b0601ec2c41b`,
    //暫時不用
    password: process.env.password,
    gethWebsocketUrl: `ws://localhost:8545`,
    //keystoreDir:`C:\\Users\\nccu\\implement\\chain_new\\data\\keystore`
    keystoreDir: `/Users/nccu/Documents/implement/chain_new/data/keystore`
  },
};
