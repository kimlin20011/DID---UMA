const sign = require("../models/umaRqP/sign");
const getExistResources = require("../models/db/getExistResources");
const getExistUser = require("../models/db/getExistUser");
const createUserDID = require("../models/umaRqP/createUserDID");
const getLocalIP = require("../models/getLocalIP");

module.exports = {
  async sign(ctx) {
    let formData = ctx.request.body;
    let res = {};
    try {
      let result = await sign(formData);
      res = result;
      ctx.body = res;
    } catch (error) {
      ctx.body = error;
    }
  },
  //get resource for client;
  async getExistResources(ctx) {
    let formData = ctx.request.body;
    let res = {};
    try {
      let result = await getExistResources(formData);
      res = result;
      ctx.body = res;
    } catch (error) {
      ctx.body = error;
    }
  },
  async getExistUser(ctx) {
    let formData = ctx.request.body;
    let res = {};
    try {
      let result = await getExistUser(formData);
      res = result;
      ctx.body = res;
    } catch (error) {
      ctx.body = error;
    }
  },
  //create new DID and store to database;
  async createUserDID(ctx) {
    let formData = ctx.request.body;
    let res = {};
    try {
      let result = await createUserDID(formData);
      res = result;
      ctx.body = res;
    } catch (error) {
      ctx.body = error;
    }
  },
  async getIP(ctx) {
    let formData = ctx.request.body;
    let res = {};
    try {
      let result = await getLocalIP(formData);
      res = result;
      ctx.body = res;
    } catch (error) {
      ctx.body = error;
    }
  }
};
