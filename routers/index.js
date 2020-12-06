/**
 * 整合所有子路由
 */

const router = require('koa-router')();

const didRegistry = require('./did_Registry');
//const didResovler = require('./did_resovler');


router.use('/didRegistry', didRegistry.routes(), didRegistry.allowedMethods());
//router.use('/didResovler', didResovler.routes(), didResovler.allowedMethods());

module.exports = router;