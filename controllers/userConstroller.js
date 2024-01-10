const aysncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");

const createUser = aysncHandler(async(req, res)=>{
    const {dateOfBirth, mobile, gender} = req.body;
    if(!dateOfBirth || !mobile || !gender){
        throw Error("Please enter the mendotory fields");
    }
    const user_id = "65322d5bf1f666a542d0ca89";// to remove
    const userCheck = await User.findOne({user_id});
    if(userCheck){
        res.status(400)
        throw Error("User is already exist");
    }
    const user = await User.create({
        user_id:user_id,
        profile:null,
        dateOfBirth,
        mobile,
        gender,
    }) 
    if(user){
       res.status(200).json({"status":true,"message":"User is created successfully","data":user});
    }else{
       res.status(500).json({"status":false, "message":"somthing went wrong"});
    }
});

// ========= Update User Data ==============
const updateUser = aysncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(400);
        throw new Error("User not found");
    }
    const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json({"status":true,"message":"User is updated successfully", "data":updateUser});
});

// ========= Delete User Data ==============
const deleteUser = aysncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(400);
        throw new Error("user not found");
    }
    await User.deleteOne({_id:req.params.id});
    res.status(200).json({"status":true,"message":"User is deleted successfully"});
});


// ========= Get Logged User Data ==============
const currentUser = aysncHandler(async (req, res)=>{
    let admin = await Admin.findById(req.params.id);
    let user = await User.findOne({ user_id: admin._id });
    if(admin && user){
        const data = {
            user_id: admin._id,
            name: admin.name,
            email: admin.email,
            profile: admin.profile,
            dateOfBirth: user.dateOfBirth,
            mobile: user.mobile,
            gender: user.gender,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            __v: user.__v,
        }
        res.status(200).json({"status":true,"message":"Get user successfully", "data":data});
    }else{
        res.status(400);
        throw new Error("User data not found! please complete your profile");
    }
});



module.exports = { createUser , updateUser, deleteUser, currentUser}