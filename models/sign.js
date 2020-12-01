//const fs = require('fs');
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || `ws://localhost:8546`);
//const config = require('../../config/config');

async function sign() {
  //let releaseToken = JSON.parse(fs.readFileSync('./releaseToken.json', 'utf-8'));
  let message = `test_buma`;
  let account = await web3.eth.getAccounts();
  let password = `test`;

  return new Promise((resolve, reject) => {
    //arg: token,account.password
    web3.eth.personal
      .sign(message, account[3], password)
      .then(result => {
        let res = {};
        res.signature = result;
        res.status = true;
        /* let data = JSON.stringify(result);
                fs.writeFileSync('./signedMessage.json', data);*/
        console.log(`signature:${res.signature}`);
        resolve(res);
      })
      .catch(function(err) {
        console.log(err);
        reject(err);
      });
  });
}

let a = sign();
