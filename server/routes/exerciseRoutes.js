const express = require("express");
const router = express.Router();

const {
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
} = require("../controllers/exerciseControllers");

// Create & Get All Exercises
router.route("/")
  .post(createExercise)
  .get(getAllExercises);

// Get, Update & Delete Exercise by ID
router.route("/:id")
  .get(getExerciseById)
  .put(updateExercise)
  .delete(deleteExercise);

module.exports = router;