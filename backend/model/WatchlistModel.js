const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
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
        price: {
            type: Number,
            required: true
        },
        percent: {
            type: String,
            default: "0%"
        },
        isDown: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

watchlistSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Watchlist", watchlistSchema);
