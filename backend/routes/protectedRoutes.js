const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// router.get("/protected/info", authenticateToken, (req, res) => {
//   res.json({ message: "This is protected information." });
// });

module.exports = router;
