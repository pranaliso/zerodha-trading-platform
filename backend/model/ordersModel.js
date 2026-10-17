const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
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
        price: {
            type: Number,
            required: true
        },
        mode: {
            type: String,
            required: true,
            enum: ["BUY", "SELL"]
        },
        status: {
            type: String,
            default: "Completed"
        }
    },
    {
        timestamps: true
    }
);

const Orders = mongoose.model("Order", ordersSchema);

module.exports = Orders;
