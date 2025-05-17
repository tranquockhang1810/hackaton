const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  participants: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true }
    }
  ],
  name: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Chat", ChatSchema);