const router = require("koa-router")();
const didStorage = require("../controllers/didStorage");

module.exports = router.get("/", didStorage.getDucument);
