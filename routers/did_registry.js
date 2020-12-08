const router = require('koa-router')();
const didRegistry = require('../controllers/didRegistry');

module.exports = router
    .post('/deploy', didRegistry.deploy)
    .post('/registerIdentity', didRegistry.registerIdentity)
    .post('/setDocumentInfo', didRegistry.setDocumentInfo)
    // .post('/deploy_Auth', blockchain.deploy_Auth_contract)
    // .get('/accounts', blockchain.getAccounts)