const Exercise = require("../models/Exercise");

// Create Exercise
const createExercise = async (req, res) => {
  try {
    const exercise = await Exercise.create(req.body);

    res.status(201).json({
      success: true,
      message: "Exercise added successfully",
      data: exercise,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Exercises with Search  and Filters
const getAllExercises = async (req, res) => {
   try {
    const { search, category, muscleGroup, difficulty, equipment } = req.query;

    // Create filter object
    const filter = {};

    // Search by exercise name
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by muscle group
    if (muscleGroup) {
      filter.muscleGroup = muscleGroup;
    }

    // Filter by difficulty
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    // Filter by equipment
    if (equipment) {
      filter.equipment = equipment;
    }

    const exercises = await Exercise.find(filter);

    res.status(200).json({
      success: true,
      count: exercises.length,
      data: exercises,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Exercise by ID
const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }

    res.status(200).json({
      success: true,
      data: exercise,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Exercise
const updateExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Exercise updated successfully",
      data: exercise,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Exercise
const deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
};