const mongoose = require("mongoose");

const positionsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        product: {
            type: String,
            required: true,
            default: "CNC"
        },
        name: {
            type: String,
            required: true,
            trim: true,
            uppercase: true
        },
        qty: {
            type: Number,
            required: true
        },
        avg: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        net: {
            type: String,
            default: "0%"
        },
        day: {
            type: String,
            default: "0%"
        }
    },
    {
        timestamps: true
    }
);

positionsSchema.index({ user: 1, name: 1 }, { unique: true });

const Positions = mongoose.model("Position", positionsSchema);

module.exports = Positions;
