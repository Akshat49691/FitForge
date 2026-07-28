const express= require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const User =require("../models/User");
router.get("/profile", authMiddleware, async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
});
router.put("/profile", authMiddleware, async (req, res)=>{
    try{
        const {name,email} = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {
                name,
                email,
            },
            {
                new:true,
            }
        ).select("-password");
        res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            user:updatedUser,
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Server Error",
        });
    }
})

module.exports = router;