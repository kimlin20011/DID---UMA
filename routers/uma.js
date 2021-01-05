const router = require("koa-router")();
const didRegistry = require("../controllers/uma_authorization");

module.exports = router
  .post("/deploy", didRegistry.deploy)