const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
   {
    user_id:{
        type: String,
        required:true,
    },
    profile:{
        type: String,
        default:{}
    },
    dateOfBirth:{
        type: Date,
        required: true, 
    },
    mobile:{
        type: String, // Array of strings (assuming mobile numbers are strings)
        required: true, 
    },
    gender:{
        type:String,
        required:[true, 'Plesae select your gender'],
    },
    status:{
        type:Number,
        default: 0
    }
   },
   {
    timestamps: true,
   }
)

module.exports = mongoose.model("User",userSchema);