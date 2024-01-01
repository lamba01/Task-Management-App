const bcrypt = require("bcrypt");
const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

async function signupController(req, res) {
  const userData = req.body;
  try {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Insert user into the database using promise-based API
    const [result] = await db
      .promise()
      .query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [
        userData.username,
        userData.email,
        hashedPassword,
      ]);

    // Get the last inserted ID
    const userId = result.insertId;

    // Generate JWT token
    const token = jwt.sign({ userId }, secretKey, {
      expiresIn: "1d", // You can adjust the expiration time
    });

    // Set the token as a cookie (you can also send it in the response body)
    res.cookie("token", token, { httpOnly: true });

    return res.status(201).json({
      message: "User signed up successfully",
      token,
      userId,
      username: userData.username,
    });
  } catch (error) {
    console.error("Error inserting user data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = signupController;
