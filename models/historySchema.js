const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    name: {
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

const history = new mongoose.model("history" , historySchema);
module.exports = history;