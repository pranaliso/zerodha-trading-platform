const mongoose = require("mongoose");

const holdingsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
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

holdingsSchema.index({ user: 1, name: 1 }, { unique: true });

const Holdings = mongoose.model("Holding", holdingsSchema);

module.exports = Holdings;
