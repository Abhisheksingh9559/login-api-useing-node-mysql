const { config } = require('../config/db.config');
const { MESSAGES } = require('../constants/messages');
const { RESPONSE_STATUS } = require('../constants/status-code')
const { db, sqlFunction } = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userLoginApi = async (req, res) => {
    try {
        const { username, password } = req;
        const selectSql = `select password, username from user_login where username = '${username}' limit 1;`;
        const sqlData = await sqlFunction(selectSql);
        if (!sqlData) {
            return {
                status: RESPONSE_STATUS.FAIL,
                message: MESSAGES.COMMON_MESSAGE.INVALID_USERNAME_OR_PASSWORD,
            };
        }
        const validPassworld = sqlData[0].password;
        const validName = sqlData[0].username;
        if (username !== validName || password !== validPassworld) {
            return {
                status: RESPONSE_STATUS.FAIL,
                message: MESSAGES.COMMON_MESSAGE.INVALID_USERNAME_OR_PASSWORD,
            };
        }
        return {
            status: RESPONSE_STATUS.SUCCESS,
            message: MESSAGES.COMMON_MESSAGE.LOGIN_SUCCESSFUL,
        };
    } catch (error) {
        return {
            message: MESSAGES.COMMON_MESSAGE.SOMETHING_WENT_WRONG,
            status: RESPONSE_STATUS.FAIL,
        };
    }
};


exports.userVerifyApi = async (req, res) => {
    try {
        const { username, password } = req;
        if (!username) {
            return {
                status: RESPONSE_STATUS.FAIL,
                message: MESSAGES.COMMON_MESSAGE.INVALID_PARAMETERS,
            };
        }
        const selectData = await sqlFunction(`select id from user_login where username = '${username}'`);
        if (selectData.length === 0) {
            return {
                status: RESPONSE_STATUS.FAIL,
                message: MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND,
            };
        };
        return { status: RESPONSE_STATUS.SUCCESS, message: MESSAGES.COMMON_MESSAGE.LOGIN_SUCCESSFUL };
    } catch (error) {
        return {
            message: MESSAGES.COMMON_MESSAGE.SOMETHING_WENT_WRONG,
            status: RESPONSE_STATUS.FAIL,
        };
    }
};

exports.userPasswordRestApi = async (data) => {
    try {
        const { username, password, email, phone } = data;
        if (!username || !password) {
            return {
                status: RESPONSE_STATUS.FAIL,
                message: MESSAGES.COMMON_MESSAGE.INVALID_PARAMETERS,
            };
        }
        const bcryptPassword = bcrypt.hashSync(password, 10);
        if (username || email || phone) {
            await sqlFunction(`update user_login
        set password = '${bcryptPassword}', uts = now()
        where username = '${username}';`);
        };
        return { status: RESPONSE_STATUS.SUCCESS, message: MESSAGES.COMMON_MESSAGE.PASSWORD_UPDATED };
    } catch (error) {
        console.log(error);
        return {
            message: MESSAGES.COMMON_MESSAGE.SOMETHING_WENT_WRONG,
            status: RESPONSE_STATUS.FAIL,
        };
    }
};
