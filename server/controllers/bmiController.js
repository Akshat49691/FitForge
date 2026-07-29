const BMI = require("../models/BMI");

// Create BMI Record
const createBMI = async (req, res) => {
  try {
    const { height, weight } = req.body;

    if (!height || !weight) {
      return res.status(400).json({
        success: false,
        message: "Height and Weight are required",
      });
    }

    const bmi = Number((weight / (height * height)).toFixed(2));

    let category = "";

    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi < 25) {
      category = "Normal weight";
    } else if (bmi < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    const bmiRecord = await BMI.create({
      height,
      weight,
      bmi,
      category,
    });

    res.status(201).json({
      success: true,
      message: "BMI calculated and saved successfully",
      data: bmiRecord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All BMI Records
const getAllBMI = async (req, res) => {
  try {
    const bmiRecords = await BMI.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bmiRecords.length,
      data: bmiRecords,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get BMI by ID
const getBMIById = async (req, res) => {
  try {
    const bmiRecord = await BMI.findById(req.params.id);

    if (!bmiRecord) {
      return res.status(404).json({
        success: false,
        message: "BMI record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: bmiRecord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update BMI Record
const updateBMI = async (req, res) => {
  try {
    const { height, weight } = req.body;

    let updateData = { ...req.body };

    if (height && weight) {
      const bmi = Number((weight / (height * height)).toFixed(2));

      let category = "";

      if (bmi < 18.5) {
        category = "Underweight";
      } else if (bmi < 25) {
        category = "Normal weight";
      } else if (bmi < 30) {
        category = "Overweight";
      } else {
        category = "Obese";
      }

      updateData.bmi = bmi;
      updateData.category = category;
    }

    const bmiRecord = await BMI.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!bmiRecord) {
      return res.status(404).json({
        success: false,
        message: "BMI record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "BMI updated successfully",
      data: bmiRecord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete BMI Record
const deleteBMI = async (req, res) => {
  try {
    const bmiRecord = await BMI.findByIdAndDelete(req.params.id);

    if (!bmiRecord) {
      return res.status(404).json({
        success: false,
        message: "BMI record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "BMI record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBMI,
  getAllBMI,
  getBMIById,
  updateBMI,
  deleteBMI,
};