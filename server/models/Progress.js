const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    weight: {
      type: Number,
      required: true,
    },

    bmi: {
      type: Number,
      required: true,
    },

    bodyFat: {
      type: Number,
      default: 0,
    },

    workoutCompleted: {
      type: Number,
      default: 0,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Progress", progressSchema);