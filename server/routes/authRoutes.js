const express=require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authmiddleware");

router.post("/register", async(req,res)=>{
    try{
    const {name,email,password}=req.body;
    const existingUser=await User.findOne({email});

    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User already exists"
        });
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    });
    res.status(201).json({
        success:true,
        message:"User registered successfully",
        user:{
            id:user._id,
            name: user.name,
            email:user.email,
        }
    });
}
catch(error){
    return res.status(500).json({
        success:false,
        message:"Server Error",
    });
}
});
router.post("/login", async (req, res) => {
    try{
    const { email, password } = req.body;
        
    const user = await User.findOne({ email });
    
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid email or password",
        });
    }
    const isMatch = await bcrypt.compare(password,user.password);
   
    if(!isMatch){
        return res.status(400).json({
            success:false,
            message:"Invalid email or password"
        })
    }
    const token = jwt.sign(
        {
            id:user._id,
            email:user.email,
        },

    process.env.JWT_SECRET,
    {
        expiresIn:"7d",
    }
);
res.status(200).json({
    success:true,
    message:"Login successful",
    token,
    user:{
        id:user._id,
        name:user.name,
        email:user.email,
    },
});
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server Error",
        })
    }
});
router.get("/profile", authMiddleware, (req, res) => {

    res.status(200).json({
        success: true,
        message: "Welcome to your profile!",
        user: req.user,
    });

});
module.exports = router;