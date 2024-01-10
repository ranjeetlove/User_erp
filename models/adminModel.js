const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
   {
    name:{
        type:String,
        required:[true, "Name filed is required"]
    },
    email:{
        type:String,
        required:[true, "Email filed is required"],
        unique:[true, 'Email id already exit'],
        lowercase: true, 
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address'],
    },
    password:{
        type:String,
        required:[true, "password field is required"]
    }
   },
   {
    timestamps: true,
   }
)

module.exports = mongoose.model("Admin",adminSchema);