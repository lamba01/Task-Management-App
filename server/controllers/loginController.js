const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

async function loginController(req, res) {
  const { email, password, rememberMe } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
      if (bcryptErr) {
        console.error("Error comparing passwords:", bcryptErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (bcryptResult) {
        const tokenExpiration = rememberMe ? "3d" : "1d";
        const token = jwt.sign({ userId: user.id }, secretKey, {
          expiresIn: tokenExpiration,
        });
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.status(200).cookie("token", token, options).json({
          message: "Login successful",
          token,
          userId: user.id,
          userName: user.username,
        });
      } else {
        return res.status(401).json({ error: "Incorrect password" });
      }
    });
  });
}

module.exports = loginController;
