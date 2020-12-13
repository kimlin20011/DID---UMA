const router = require("koa-router")();
const blockchain = require("../controllers/blockchain_controller");

module.exports = router.get("/accounts", blockchain.getAccounts);
