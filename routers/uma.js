const router = require("koa-router")();
const uma = require("../controllers/uma_authorization");
const umaRqP = require("../controllers/umaRqP");

module.exports = router
  .post("/deploy", uma.deploy)
  .post("/setProtectedResource", uma.setProtectedResource)
  .post("/setPolicy", uma.setPolicy)
  .post("/requestRegister", uma.requestRegister)
  .post("/accessAuthorize", uma.accessAuthorize)
  .get("/tokenIntrospect", uma.tokenIntrospect)
  .get("/sign", umaRqP.sign)