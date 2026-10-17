const mongoose = require("mongoose");


const PositionsSchema = new mongoose.Schema({

    product: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
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
    },

    isLoss: {
        type: Boolean,
        default: false
    }

});


module.exports = PositionsSchema;