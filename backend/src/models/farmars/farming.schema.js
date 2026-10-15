const mongoose = require("mongoose");

let farmingSchema = mongoose.Schema(
  {
    crop: {
      type: String,
      required: true,
    },
    soil: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    plantingDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tasks: [
      {
        title: {
          type: String,
          required: true,
        },
        description: String,
        dueDate: Date,
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true },
);

let Farming = mongoose.model("Farming", farmingSchema);

module.exports = Farming;
