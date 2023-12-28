const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

async function updateBoardController(req, res) {
  const { boardId } = req.params;
  const { boardName } = req.body;
  const token = req.headers.authorization;

  try {
    // Check if the token is provided in the request headers
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Extract the JWT token from the "Authorization" header
    const tokenParts = token.split(" "); // Split "Bearer {token}" into an array
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ error: "Invalid token format" });
    }
    const jwtToken = tokenParts[1];

    // Verify the JWT token using the secret key
    jwt.verify(jwtToken, secretKey, async (jwtError, decoded) => {
      if (jwtError) {
        // JWT verification failed; return an unauthorized response
        return res.status(401).json({ error: "Unauthorized" });
      }

      // User is authenticated; you can access their user ID from the 'decoded' object
      const userId = decoded.userId;

      // Update the board name in the database
      db.query(
        "UPDATE boards SET board_name = ? WHERE user_id = ? AND board_id = ?",
        [boardName, userId, boardId]
      );

      console.log("Board data is updated successfully");
      return res.json({ message: "Board updated successfully" });
    });
  } catch (error) {
    console.error("Error in updateBoardController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = updateBoardController;
