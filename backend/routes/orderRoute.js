const express = require("express");

const router = express.Router();

const {
    getOrders,
    createOrder,
    sellOrder
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");


// ================================
// ORDERS ROUTES
// ================================


// GET all orders
router.get(
    "/",
    authMiddleware,
    getOrders
);


// BUY
router.post(
    "/",
    authMiddleware,
    createOrder
);


// SELL
router.post(
    "/sell",
    authMiddleware,
    sellOrder
);


module.exports = router;