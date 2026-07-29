const express = require("express");
const router = express.Router();

const {
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutControllers");

// Create Workout & Get All Workouts
router.route("/")
  .post(createWorkout)
  .get(getAllWorkouts);

// Get, Update & Delete Workout by ID
router.route("/:id")
  .get(getWorkoutById)
  .put(updateWorkout)
  .delete(deleteWorkout);

module.exports = router;