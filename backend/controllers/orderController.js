const OrdersModel = require("../model/OrdersModel");
const HoldingsModel = require("../model/HoldingsModel");
const PositionsModel = require("../model/PositionsModel");
const TransactionModel = require("../model/TransactionModel");
const { findStock } = require("../data/stocks");
const { getOrCreateFunds } = require("./FundsController");
const getUserId = require("../utils/getUserId");

const percentChange = (avg, price) => {
    if (!avg) return "0%";
    const change = ((price - avg) / avg) * 100;
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(2)}%`;
};

const getOrders = async (req, res, next) => {
    try {
        const userId = getUserId(req);

        const orders = await OrdersModel.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

const createOrder = async (req, res, next) => {
    try {
        const userId = getUserId(req);
        const { name, qty, price } = req.body;

        if (!name || qty === undefined || price === undefined) {
            return res.status(400).json({
                success: false,
                message: "Stock, quantity and price are required"
            });
        }

        const stock = findStock(name);

        if (!stock) {
            return res.status(400).json({
                success: false,
                message: "Invalid stock"
            });
        }

        const quantity = Number(qty);
        const latestPrice = Number(price);

        if (!Number.isFinite(quantity) || !Number.isFinite(latestPrice) || quantity <= 0 || latestPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid quantity or price"
            });
        }

        const total = quantity * latestPrice;
        const funds = await getOrCreateFunds(userId);

        if (funds.availableCash < total) {
            return res.status(400).json({
                success: false,
                message: "Insufficient funds"
            });
        }

        funds.availableCash -= total;
        await funds.save();

        const order = await OrdersModel.create({
            user: userId,
            name: stock.name,
            qty: quantity,
            price: latestPrice,
            mode: "BUY",
            status: "Completed"
        });

        await TransactionModel.create({
            user: userId,
            type: "BUY",
            amount: total,
            note: `Bought ${quantity} ${stock.name}`
        });

        let holding = await HoldingsModel.findOne({ user: userId, name: stock.name });

        if (holding) {
            const totalInvestment = holding.avg * holding.qty + latestPrice * quantity;
            const totalQty = holding.qty + quantity;

            holding.avg = Number((totalInvestment / totalQty).toFixed(2));
            holding.qty = totalQty;
            holding.price = latestPrice;
            holding.net = percentChange(holding.avg, latestPrice);
            holding.day = stock.percent;
            await holding.save();
        } else {
            await HoldingsModel.create({
                user: userId,
                name: stock.name,
                qty: quantity,
                avg: latestPrice,
                price: latestPrice,
                net: percentChange(latestPrice, latestPrice),
                day: stock.percent
            });
        }

        let position = await PositionsModel.findOne({ user: userId, name: stock.name });

        if (position) {
            const totalInvestment = position.avg * position.qty + latestPrice * quantity;
            const totalQty = position.qty + quantity;

            position.avg = Number((totalInvestment / totalQty).toFixed(2));
            position.qty = totalQty;
            position.price = latestPrice;
            position.net = percentChange(position.avg, latestPrice);
            position.day = stock.percent;
            await position.save();
        } else {
            await PositionsModel.create({
                user: userId,
                product: "CNC",
                name: stock.name,
                qty: quantity,
                avg: latestPrice,
                price: latestPrice,
                net: "0%",
                day: stock.percent
            });
        }

        res.status(201).json({
            success: true,
            message: "Buy order placed successfully",
            order
        });
    } catch (error) {
        next(error);
    }
};

const sellOrder = async (req, res, next) => {
    try {
        const userId = getUserId(req);
        const { name, qty, price } = req.body;

        if (!name || qty === undefined || price === undefined) {
            return res.status(400).json({
                success: false,
                message: "Stock, quantity and price are required"
            });
        }

        const stock = findStock(name);

        if (!stock) {
            return res.status(400).json({
                success: false,
                message: "Invalid stock"
            });
        }

        const quantity = Number(qty);
        const latestPrice = Number(price);

        if (!Number.isFinite(quantity) || !Number.isFinite(latestPrice) || quantity <= 0 || latestPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid quantity or price"
            });
        }

        const holding = await HoldingsModel.findOne({ user: userId, name: stock.name });

        if (!holding) {
            return res.status(404).json({
                success: false,
                message: "Holding not found"
            });
        }

        if (holding.qty < quantity) {
            return res.status(400).json({
                success: false,
                message: "Not enough quantity"
            });
        }

        const credit = quantity * latestPrice;
        const funds = await getOrCreateFunds(userId);

        funds.availableCash += credit;
        await funds.save();

        const order = await OrdersModel.create({
            user: userId,
            name: stock.name,
            qty: quantity,
            price: latestPrice,
            mode: "SELL",
            status: "Completed"
        });

        await TransactionModel.create({
            user: userId,
            type: "SELL",
            amount: credit,
            note: `Sold ${quantity} ${stock.name}`
        });

        holding.qty -= quantity;
        holding.price = latestPrice;
        holding.net = percentChange(holding.avg, latestPrice);
        holding.day = stock.percent;

        if (holding.qty === 0) {
            await HoldingsModel.deleteOne({ _id: holding._id, user: userId });
        } else {
            await holding.save();
        }

        const position = await PositionsModel.findOne({ user: userId, name: stock.name });

        if (position) {
            position.qty -= quantity;
            position.price = latestPrice;
            position.net = percentChange(position.avg, latestPrice);
            position.day = stock.percent;

            if (position.qty <= 0) {
                await PositionsModel.deleteOne({ _id: position._id, user: userId });
            } else {
                await position.save();
            }
        }

        res.status(201).json({
            success: true,
            message: "Sell order placed successfully",
            order
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getOrders,
    createOrder,
    sellOrder
};
