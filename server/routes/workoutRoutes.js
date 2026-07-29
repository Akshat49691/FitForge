const express =require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const Workout= require("../models/Workout");

router.post("/",authMiddleware,async(req,res)=>{
    try{
        const{title,category,duration,difficulty}=req.body;
        const workout= new Workout({
            
            user:req.user.id,
            title,
            category,
            duration,
            difficulty,
        });
        await workout.save();
        res.status(201).json({
            success:true,
            message:"Workout created successfully",
            workout,
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
router.get("/",authMiddleware,async(req,res)=>{
    try{
        const workouts = await Workout.find({
            user:req.user.id
        });
        res.status(200).json({
            success:true,
            count:workouts.length,
            workouts,
        });
    }
    catch(error){
         console.error("GET /workouts Error:", error);
        return res.status(500).json({
            success:false,
            message:"Server Error",
        });
    }
});
 
router.put("/:id",authMiddleware,async(req,res)=>{
    try{
        const workout= await Workout.findById(req.params.id);
        if(!workout){
            return res.status(404).json({
                success:false,
                message:"Workout not found",
            });
        }
        if(workout.user. toString()!==req.user.id){
            return res.status(403).json({
                success:false,
                message:"Unauthorized",
            });
        }
        const{title,category,duration,difficulty}=req.body;
        workout.title=title;
        workout.category=category;
        workout.duration=duration;
        workout.difficulty=difficulty;
        await workout.save();

        res.status(200).json({
            success:true,
            message:"Workout updated successfully",
            workout,
        });
    }
    catch(error){
        console.error("PUT /workouts Error:", error);
        return res.status(500).json({
            success:false,
            message:"Server Error",
        });
    }
});
router.delete("/:id",authMiddleware,async(req,res)=>{
    try{
        const workout=await Workout.findById(req.params.id);
        if(!workout){
            return res.status(404).json({
                success:false,
                message:"Workout not found"
            });
        }
         if (workout.user.toString() !== req.user.id) {
        return res.status(403).json({
            success: false,
            message: "Unauthorized",
        });
    }

    await workout.deleteOne();

    res.status(200).json({
        success: true,
        message: "Workout deleted successfully",
    });
    }
    catch(error){
        console.error("DELETE/workout Error:",error);
        return res.status(500).json({
        success:false,
        message:"Server Error",
        });
    }
});

module.exports = router;