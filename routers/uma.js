const router = require("koa-router")();
const uma = require("../controllers/uma_authorization");

module.exports = router
  .post("/deploy", uma.deploy)
  .post("/setProtectedResource", uma.setProtectedResource)
  .post("/setPolicy", uma.setPolicy)
  .post("/requestRegister", uma.requestRegister)
  .post("/accessAuthorize", uma.accessAuthorize)