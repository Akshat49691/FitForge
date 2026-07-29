const express =require('express');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const app=express();
const dashboardRoutes = require("./routes/dashboardRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/workouts",workoutRoutes);
app.get("/api/health",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Fit-Forge API is running"
    });
});
module.exports=app;