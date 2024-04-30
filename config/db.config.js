const config = {
    host: "localhost",
    user: "root",
    password: "roots",
    database: "my_test_db",
    connectionLimit: 10,
    jsonWebToken: {
      privateKey: "surajJwtKey"
    },
  }

  module.exports = { config };