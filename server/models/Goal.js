const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    goalName: {
      type: String,
      required: true,
      trim: true,
    },

    targetValue: {
      type: Number,
      required: true,
    },

    currentValue: {
      type: Number,
      default: 0,
    },

    unit: {
      type: String,
      required: true,
    },

    targetDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);