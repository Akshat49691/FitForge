const express =require('express');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const app=express();
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/exercises", exerciseRoutes);
app.get("/api/health",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Fit-Forge API is running"
    });
});
module.exports=app;