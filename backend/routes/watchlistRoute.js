const express = require("express");
const router = express.Router();

const {
    getWatchlist,
    createWatchlist,
    deleteWatchlist
} = require("../controllers/watchlistController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getWatchlist);
router.post("/", authMiddleware, createWatchlist);
router.delete("/:id", authMiddleware, deleteWatchlist);

module.exports = router;
