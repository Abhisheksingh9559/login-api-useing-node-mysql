const { config } = require('../config/db.config');
const { MESSAGES } = require('../constants/messages');
const { RESPONSE_STATUS } = require('../constants/status-code')
const { db, sqlFunction } = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userLoginApi = async (req, res) => {
    try {
        const { username, password } = req;
        const selectSql = `select user_password, username from user_login where username = '${username}' limit 1;`;
        const sqlData = await sqlFunction(selectSql);
        console.log(sqlData, '---------');
        if (!sqlData) {
            return res.status(401).json({ error: MESSAGES.COMMON_MESSAGE.INVALID_USERNAME_OR_PASSWORD });
        }
        const validPassworld = sqlData[0].user_password;
        const validName = sqlData[0].Full_name;
        if (username !== validName || password !== validPassworld) {
            return res.status(401).json({ error: MESSAGES.COMMON_MESSAGE.INVALID_USERNAME_OR_PASSWORD });
        }
        return res.status(200).json({ message: MESSAGES.COMMON_MESSAGE.LOGIN_SUCCESSFUL });
    } catch (error) {
        return res.status(500).json({ error: MESSAGES.COMMON_MESSAGE.INVALID_USERNAME_OR_PASSWORD });
    }
};


exports.userVerifyApi = async (req, res) => {
    try {
        const { username, password } = req;
        const bcryptPassword = bcrypt.hashSync(password, 10);
        const selectData = await sqlFunction(`select id from user_login where username = '${username}'`);
        await sqlFunction(`update user_login
        set password = '${bcryptPassword}'
        where username = '${username}';`);
        if (selectData.length === 0) {
            return res.status(404).json({ message: MESSAGES.COMMON_MESSAGE.RECORD_NOT_FOUND });
        };
        // return {
        //     status: RESPONSE_STATUS.SUCCESS,
        // };
        return res.status(200).json({ message: MESSAGES.COMMON_MESSAGE.LOGIN_SUCCESSFUL });
    } catch (error) {
        // return {
        //     message: MESSAGES.COMMON_MESSAGE.INVALID_USERNAME_OR_PASSWORD,
        //     status: RESPONSE_STATUS.FAIL,
        // };
        console.log(error);
        return res.status(500).json({ error: MESSAGES.COMMON_MESSAGE.SOMETHING_WENT_WRONG });
    }
};
