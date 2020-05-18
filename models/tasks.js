const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  remind_date: {
    type: Date,
  },
});

module.exports = mongoose.model("Tasks", postSchema);
