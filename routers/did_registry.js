const router = require('koa-router')();
const didRegistry = require('../controllers/didRegistry');

module.exports = router
    .post('/deploy', didRegistry.deploy)
    .post('/registerIdentity', didRegistry.registerIdentity)
    .post('/setDocumentInfo', didRegistry.setDocumentInfo)
    .get('/verifyUrl', didRegistry.verifyUrl)
    .get('/verifyDocument', didRegistry.verifyDocument)
    .get('/DIDsDocumentUrls', didRegistry.DIDsDocumentUrls)