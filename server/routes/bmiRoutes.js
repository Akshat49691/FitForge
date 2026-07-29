const express = require("express");
const router = express.Router();

const {
  createBMI,
  getAllBMI,
  getBMIById,
  updateBMI,
  deleteBMI,
} = require("../controllers/bmiController");

// Create BMI & Get All BMI Records
router.route("/")
  .post(createBMI)
  .get(getAllBMI);

// Get, Update & Delete BMI by ID
router.route("/:id")
  .get(getBMIById)
  .put(updateBMI)
  .delete(deleteBMI);

module.exports = router;