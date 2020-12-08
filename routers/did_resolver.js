const router = require('koa-router')();
const didResolver = require('../controllers/didResolver');

module.exports = router
    .get('/resolve', didResolver.resolve)