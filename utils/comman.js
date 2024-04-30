
const jwt = require('jsonwebtoken');
const { config } = require('../config/db.config');
const { RESPONSE_STATUS, MESSAGES } = require('../constants');


exports.generateToken = (username) => {
    try {
        const token = jwt.sign({ username }, config.jsonWebToken.privateKey, { expiresIn: '1h' });
        console.log(token, '----10');
        return {
            status: RESPONSE_STATUS.SUCCESS,
            data: token
        };
    } catch (error) {
        return {
            status: RESPONSE_STATUS.ERROR,
            message: error.message
        };
    }
};

exports.verifyToken = (token, secretKey) => {
    try {
        secretKey = config.jsonWebToken.privateKey;
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
};

exports.apiAuthenticated = () => async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return {
                status: RESPONSE_STATUS.UNAUTHORIZED,
                message: MESSAGES.COMMON_MESSAGE.INVALID_TOKEN,
            };
        }
        const { status } = await this.verifyToken(token);
        if (status !== RESPONSE_STATUS.SUCCESS) {
            return {
                status: RESPONSE_STATUS.UNAUTHORIZED,
                message: MESSAGES.COMMON_MESSAGE.INVALID_TOKEN,
            };
        }
    } catch (error) {
        const responseData = {
            status: RESPONSE_STATUS.UNAUTHORIZED,
            message: MESSAGES.COMMON_MESSAGE.INVALID_TOKEN,
        };
        return (responseData);
    }
    return next();
};