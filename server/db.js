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

// Create a MySQL connection
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "2004",
//   database: "recipe a",
// });

// // Connect to MySQL
// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     throw err; // You might want to handle this error more gracefully in a production environment
//   }
//   console.log("Connected to MySQL!");
// });

// Export the connection
module.exports = connection;
