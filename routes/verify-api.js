const express = require('express');
const verifyApiRouter = express.Router();

const { API_URLS } = require('../constants');
const { userLoginApi, userVerifyApi, userPasswordRestApi } = require('../services/verify-login');
const { apiAuthenticated, apiStatusCode } = require('../utils/comman');

verifyApiRouter.post(API_URLS.USER_LOGIN, 
  async (req, res) => { 
    apiStatusCode(await userLoginApi(req.body, res), res);
});

verifyApiRouter.get(API_URLS.USER_VERIFY, 
  async (req, res) => {
    apiStatusCode(await userVerifyApi(req.query, res), res);
});

verifyApiRouter.post(API_URLS.USER_PASSWORD_RESET,
  async (req, res) => {
    apiStatusCode(await userPasswordRestApi(req.body, res), res);
});
module.exports = verifyApiRouter;