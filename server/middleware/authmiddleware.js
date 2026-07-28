const jwt =require("jsonwebtoken");
const authMiddleware=(req,res,next)=>{
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("token:",token);
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Access Denied. No token provided.",
        });
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log("Decoded Token:",decoded);
        req.user=decoded;
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Invalid token",
        });
    }

};
module.exports=authMiddleware;