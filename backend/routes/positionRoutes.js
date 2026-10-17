const express = require("express");
const router = express.Router();

const { getPositions } = require("../controllers/positionController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getPositions);

module.exports = router;
