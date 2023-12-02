const bcrypt = require("bcrypt");
const db = require("../db");

async function signupController(req, res) {
  const userData = req.body;
  const Encpass = await bcrypt.hash(userData.password, 10);

  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [userData.username, userData.email, Encpass],
    (err, result) => {
      if (err) {
        console.error("Error inserting user data:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log("User data is inserted successfully");
      return res.json({ message: "User signed up successfully" });
    }
  );
}

module.exports = signupController;
