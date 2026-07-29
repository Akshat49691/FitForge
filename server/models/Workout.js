const mongoose = require("mongoose");
const workoutSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title:{
        type:String,
        required:true,

    },
    category:{
        type: String,
        required:true,
    },
    duration:{
        type: Number,
        required:true,

    },
    difficulty:{
        type: String,
        enum: ["Beginner","Intermediate","Advanced"],
        required: true,

    },

},
{
timestamps:true,
}
);

module.exports = mongoose.model("Workout", workoutSchema);