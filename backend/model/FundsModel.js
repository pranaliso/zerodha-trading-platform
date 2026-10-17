const mongoose = require("mongoose");

const fundsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        availableCash: {
            type: Number,
            default: 100000
        },
        usedMargin: {
            type: Number,
            default: 0
        },
        openingBalance: {
            type: Number,
            default: 100000
        },
        payin: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const FundsModel = mongoose.model("Funds", fundsSchema);

module.exports = FundsModel;
