const PositionsModel = require("../model/PositionsModel");
const getUserId = require("../utils/getUserId");

const getPositions = async (req, res, next) => {
    try {
        const userId = getUserId(req);
        const positions = await PositionsModel.find({ user: userId });

        res.status(200).json(positions);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPositions
};
