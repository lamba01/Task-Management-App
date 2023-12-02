const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2004",
  database: "recipe a",
});

module.exports = connection;
