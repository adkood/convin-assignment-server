const mongoose = require("mongoose");

const bucketSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

const buckets = new mongoose.model("buckets", bucketSchema);
module.exports = buckets;