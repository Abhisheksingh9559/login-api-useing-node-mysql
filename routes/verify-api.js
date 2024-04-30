const express = require('express');
const verifyApiRouter = express.Router();

const { API_URLS } = require('../constants');
const { userLoginApi, userVerifyApi } = require('../services/verify-login');
const { apiAuthenticated } = require('../utils/comman');

verifyApiRouter.post(API_URLS.USER_LOGIN, 
  // apiAuthenticated(),
  async (req, res) => {
  console.log('start 1222222');
   (await userLoginApi(req.body), res);
});

verifyApiRouter.get(API_URLS.USER_VERIFY, async (req, res) => {
  console.log('start 1444444');
  apiAuthenticated()
  (await userVerifyApi(req.body), res);
});

module.exports = verifyApiRouter;