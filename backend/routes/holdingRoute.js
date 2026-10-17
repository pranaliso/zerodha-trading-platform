const express = require("express");
const router = express.Router();

const { getHoldings } = require("../controllers/holdingController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getHoldings);

module.exports = router;
