const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.query("SELECT 1", (error, results, fields) => {
  if (error) {
    console.error("Error connecting to aiven:", error);
    throw error;
  }
  console.log("Connected to Aiven");
  console.log("Example query result:", results);
});

// Export the connection
module.exports = connection;
