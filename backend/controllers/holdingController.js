const HoldingsModel = require("../model/HoldingsModel");
const getUserId = require("../utils/getUserId");

const getHoldings = async (req, res, next) => {
    try {
        const userId = getUserId(req);
        const holdings = await HoldingsModel.find({ user: userId });

        res.status(200).json(holdings);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getHoldings
};
