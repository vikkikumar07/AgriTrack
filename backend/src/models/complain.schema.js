const mongoose = require("mongoose");

let complainSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    adminReply: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "In Progress", "Resolved"],
      default: "pending",
    },
  },
  { timestamps: true },
);

let Complain = mongoose.model("Complain", complainSchema);

module.exports = Complain;
