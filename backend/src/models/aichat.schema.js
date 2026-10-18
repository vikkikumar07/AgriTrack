const mongoose = require("mongoose");

let aiChatSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: String,
      enum: ["ai", "user"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

let Chat = mongoose.model("Chat", aiChatSchema);

module.exports = Chat;
