const router = require('koa-router')();
const didRegistry = require('../controllers/didRegistry');

module.exports = router
    .post('/deploy', didRegistry.deploy)
    // .post('/deploy_Auth', blockchain.deploy_Auth_contract)
    // .get('/accounts', blockchain.getAccounts)