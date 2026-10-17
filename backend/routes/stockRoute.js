const express = require("express");
const router = express.Router();

const { getStocks, getStock } = require("../controllers/stockController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getStocks);
router.get("/:symbol", authMiddleware, getStock);

module.exports = router;
