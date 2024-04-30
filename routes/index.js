

const express = require('express');
const router = express.Router();

const verifyApiRouter = require('./verify-api');

router.use('/api', verifyApiRouter);

module.exports = router;