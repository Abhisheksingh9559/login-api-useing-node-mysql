const express = require('express');
const verifyApiRouter = express.Router();

const { API_URLS } = require('../constants');
const { userLoginApi, userVerifyApi } = require('../services/verify-login');
const { apiAuthenticated } = require('../utils/comman');

verifyApiRouter.post(API_URLS.USER_LOGIN, 
  apiAuthenticated(),
  async (req, res) => { 
   (await userLoginApi(req.body, res), res);
});

verifyApiRouter.get(API_URLS.USER_VERIFY, 
  async (req, res) => {
   (await userVerifyApi(req.body, res), res);
});
module.exports = verifyApiRouter;