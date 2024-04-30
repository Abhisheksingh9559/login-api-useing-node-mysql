const { config } = require('../config/db.config');
const { createPool } = require('mysql');
const pool = createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    connectionLimit: config.connectionLimit
});

exports.sqlFunction = async (query) => {
    return new Promise((resolve, reject) => {
        pool.query(query, (err, result) => {
            console.log(result, '----------');
            if (err) {
                console.error('Error:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
