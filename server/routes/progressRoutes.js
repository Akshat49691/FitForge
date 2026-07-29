const express = require("express");
const router = express.Router();

const {
  createProgress,
  getAllProgress,
  getProgressById,
  updateProgress,
  deleteProgress,
} = require("../controllers/progressController");

// Create Progress & Get All Progress
router.route("/")
  .post(createProgress)
  .get(getAllProgress);

// Get, Update & Delete Progress by ID
router.route("/:id")
  .get(getProgressById)
  .put(updateProgress)
  .delete(deleteProgress);

module.exports = router;
