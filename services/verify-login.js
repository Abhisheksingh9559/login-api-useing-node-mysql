const { config } = require('../config/db.config');
const { MESSAGES } = require('../constants/messages');
const { RESPONSE_STATUS } = require('../constants/status-code')
const { db, sqlFunction } = require('../database/database');
const jwt = require('jsonwebtoken');

exports.userLoginApi = async (req, res) => {
    try {
        const { name, password } = req;
        const selectSql = `SELECT user_password, Full_name FROM users WHERE Full_name = '${name}' LIMIT 1;`;
        const sqlData = await sqlFunction(selectSql);
        if (!sqlData) {
            return {
                status: RESPONSE_STATUS.FAIL,
                message: MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND
            };
        }
        const validPassworld = sqlData[0].user_password;
        const validName = sqlData[0].Full_name;
        if (name !== validName || password !== validPassworld) {
            return res.status(401).json({ error: MESSAGES.COMMON_MESSAGE.INVALID_USERNAME_OR_PASSWORD });
        }
        return res.status(200).json({ message: MESSAGES.COMMON_MESSAGE.LOGIN_SUCCESSFUL });
    } catch (error) {
        return {
            status: RESPONSE_STATUS.ERROR,
            message: error.message,
        };
    }
};


exports.userVerifyApi = async (req, res) => {
    try {
        console.log('start');
        const { name, password } = req.body;
        const insertSql = `
        INSERT INTO users (Full_name, user_password, cts)
        VALUES ('${name}', '${password}', NOW());
        `;
        await generateToken(name);
        await sqlFunction(insertSql);

        return res.status(200).json({ message: MESSAGES.COMMON_MESSAGE.SUCCESS });
        
    } catch (error) {
        return {
            status: RESPONSE_STATUS.ERROR,
            message: error.message,
        };
    }
};
