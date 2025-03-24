// Reset password
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const nodemailer = require("nodemailer");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

async function forgotPassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verify token
    const decoded = jwt.verify(token, secretKey);

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password
    db.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, decoded.id],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.json({ message: "Password successfully reset!" });
      }
    );
  } catch (error) {
    console.error("Token error:", error);
    res.status(400).json({ error: "Invalid or expired token" });
  }
}

module.exports = forgotPassword;
