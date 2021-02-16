const router = require("koa-router")();
const umaRqP = require("../controllers/umaRqP");

module.exports = router
    .get("/sign", umaRqP.sign)
    .get("/getExistResources", umaRqP.getExistResources)
    .get("/getExistUser", umaRqP.getExistUser)
    .post("/createUserDID", umaRqP.createUserDID);

