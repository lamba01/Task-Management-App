const mysql = require("mysql2");

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "2004",
  database: "recipe a", // Avoid spaces in the database name
  waitForConnections: true,
  connectionLimit: 10, // Adjust the limit based on your needs
  queueLimit: 0,
});

// Get a connection from the pool
const connection = pool.promise();

// Test the connection
connection
  .query("SELECT 1")
  .then(() => console.log("Connected to MySQL database!"))
  .catch((err) => console.error("Error connecting to MySQL:", err));

// Export the connection
module.exports = connection;
