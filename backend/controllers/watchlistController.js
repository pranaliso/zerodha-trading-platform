const Watchlist = require("../model/WatchlistModel");
const { findStock } = require("../data/stocks");
const getUserId = require("../utils/getUserId");

exports.getWatchlist = async (req, res, next) => {
    try {
        const userId = getUserId(req);
        const data = await Watchlist.find({ user: userId });

        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

exports.createWatchlist = async (req, res, next) => {
    try {
        const userId = getUserId(req);
        const stock = findStock(req.body.name);

        if (!stock) {
            return res.status(400).json({
                success: false,
                message: "Invalid stock"
            });
        }

        const existing = await Watchlist.findOne({ user: userId, name: stock.name });

        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Stock already in watchlist"
            });
        }

        const item = await Watchlist.create({
            user: userId,
            name: stock.name,
            price: stock.price,
            percent: stock.percent,
            isDown: stock.isDown
        });

        res.status(201).json(item);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Stock already in watchlist"
            });
        }

        next(err);
    }
};

exports.deleteWatchlist = async (req, res, next) => {
    try {
        const userId = getUserId(req);
        const { id } = req.params;

        const item = await Watchlist.findOneAndDelete({ _id: id, user: userId });

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Watchlist item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Removed from watchlist"
        });
    } catch (err) {
        next(err);
    }
};
