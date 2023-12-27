const db = require("../db");

async function navBoardFetch(req, res) {
  //   const token = req.headers.authorization;
  const boardId = req.params.boardId;

  try {
    // Fetch boards for the user
    db.query(
      "SELECT board_name FROM boards WHERE board_id = ?",
      [boardId],
      (err, result) => {
        if (err) {
          console.error("Error fetching boards:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.json({ board: result });
      }
    );
  } catch (error) {
    console.error("Error in fetchBoards:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = navBoardFetch;
