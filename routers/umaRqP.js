const router = require("koa-router")();
const umaRqP = require("../controllers/umaRqP");

module.exports = router
    .post("/sign", umaRqP.sign)
    .get("/getExistResources", umaRqP.getExistResources)
    .get("/getExistUser", umaRqP.getExistUser)
    .post("/createUserDID", umaRqP.createUserDID)
    .get("/getIP", umaRqP.getIP);

