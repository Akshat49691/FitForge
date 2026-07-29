const express =require('express');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const goalRoutes = require("./routes/goalRoutes");
const progressRoutes = require("./routes/progressRoutes");
const app=express();
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/progress", progressRoutes);
app.get("/api/health",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Fit-Forge API is running"
    });
});
module.exports=app;