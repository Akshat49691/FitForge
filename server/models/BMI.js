const mongoose = require("mongoose");

const bmiSchema = new mongoose.Schema(
  {
    height: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    bmi: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      enum: ["Underweight", "Normal weight", "Overweight", "Obese"],
      required: true,
    },

    recordDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BMI", bmiSchema);