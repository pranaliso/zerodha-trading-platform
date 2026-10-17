const express = require("express");
const router = express.Router();

const {
    getFunds,
    addFunds,
    withdrawFunds,
    getTransactions
} = require("../controllers/FundsController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getFunds);
router.get("/transactions", authMiddleware, getTransactions);
router.post("/add", authMiddleware, addFunds);
router.post("/withdraw", authMiddleware, withdrawFunds);

module.exports = router;
