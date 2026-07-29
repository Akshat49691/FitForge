const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const User = require("../models/User");

router.get("/", authMiddleware, async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        res.status(200).json({
            success:true,
            message:`Welcome back, ${user.name}!`,
            dashboard:{
                user,
                workoutsCompleted:0,
                caloriesBurned:0,
                activePlan:"No Workout Plan yet",
            },
        });
    }
    catch(error){
         console.error(error);
        return res.status(500).json({
            success:false,
            message:"Server Error",
        });
    }
});

module.exports = router;