/**
 * 整合所有子路由
 */

const router = require("koa-router")();

const didRegistry = require("./did_registry");
const didResolver = require("./did_resolver");
const didStorage = require("./did_storage");
const blockchain = require("./blockchain");

router.use("/didRegistry", didRegistry.routes(), didRegistry.allowedMethods());
router.use("/didResolver", didResolver.routes(), didResolver.allowedMethods());
router.use("/DIDDocument", didStorage.routes(), didStorage.allowedMethods());
router.use("/blockchain", blockchain.routes(), blockchain.allowedMethods());

module.exports = router;
