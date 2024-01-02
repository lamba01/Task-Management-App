const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.query("SELECT 1", (error, results, fields) => {
  if (error) {
    console.error("Error connecting to PlanetScale:", error);
    throw error;
  }
  console.log("Connected to PlanetScale!");
  console.log("Example query result:", results);
});

// Export the connection
module.exports = connection;
