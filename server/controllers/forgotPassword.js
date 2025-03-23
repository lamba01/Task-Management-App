const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const nodemailer = require("nodemailer");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Ensure you set up an App Password
  },
});

async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
    // Check if user exists
    db.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.length === 0) {
          return res.status(400).json({ error: "User not found" });
        }

        const user = results[0]; // Get the user from the database

        // Generate Token
        const token = jwt.sign({ id: user.id }, secretKey, {
          expiresIn: "15m",
        });

        // Send Reset Email
        const resetLink = `https://task-managementapp-client.vercel.app/reset-password/${token}`;

        try {
          await transporter.sendMail({
            from: `"Support Team" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password. The link expires in 15 minutes.</p>`,
          });

          return res.json({ message: "Reset link sent to your email." });
        } catch (emailError) {
          console.error("Email sending error:", emailError);
          return res.status(500).json({ error: "Failed to send reset email" });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = forgotPassword;
