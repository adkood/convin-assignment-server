const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bucket: {
        type: String,
        required: true 
    },
    link: {
        type: String,
        required: true
    },
    startTime: {
        type : Date,
        default: Date.now
    }
});

const cards = new mongoose.model("cards" , cardSchema);

module.exports = cards;