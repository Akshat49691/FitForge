const express =require('express');
const authRoutes = require("./routes/authRoutes");

const app=express();
app.use(express.json());
app.use("/api/auth",authRoutes);
app.get("/api/health",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Fit-Forge API is running"
    });
});
module.exports=app;