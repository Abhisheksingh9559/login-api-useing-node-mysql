
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

exports.apiStatusCode = async ({ status, message, responseCode }, res) => {
    let statusCode = 200;
    let statusMSG = 'Success';

    if (status === RESPONSE_STATUS.FAIL) {
        statusCode = 400;
        statusMSG = message;
    } else if (status === RESPONSE_STATUS.UNAUTHORIZED) {
        statusCode = 401;
        statusMSG = message;
    } else if (status === RESPONSE_STATUS.NOT_FOUND) {
        statusCode = 404;
        statusMSG = message;
    } else if (status === RESPONSE_STATUS.BAD_REQUEST) {
        statusCode = 400;
        statusMSG = message;
    }
    res.status(statusCode).json({
        status,
        message: statusMSG,
        responseCode,
    });
};
