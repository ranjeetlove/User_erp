const aysncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const loginAdmin = aysncHandler(async (req, res)=>{
    const {email, password} = req.body;
    if(email && password){
        const checkUser = await Admin.findOne({email});
        if(checkUser && (await bcrypt.compare(password, checkUser.password))){
           const accessToken = jwt.sign({checkUser:{name:checkUser.name,email:checkUser.email,id:checkUser.id}},'ranjeet@123',{expiresIn:'5m'});
           if(accessToken){
                const data = {
                    accessToken:accessToken,
                    userId:checkUser._id
                };
                res.status(201).json({'status':true, 'message':'login successfully', 'data': data});
           }else{
                res.status(400); 
                throw new Error("accessToken is not defined");
           }
        }else{
            res.status(400); 
            throw new Error("Email id is not exist");
        }
    }else{
        res.status(400); 
        throw new Error("user email and password is requird");
    }
});

const registerUser = aysncHandler(async (req, res)=>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){ 
        let errorMessgae;
        if(!name && !email && !password){
            errorMessgae = 'all fields are required';
        }else if(!name){
           errorMessgae = 'name fields is required';
        }else if(!email){
            errorMessgae = 'email fields is required';
        }else if(!password){
            errorMessgae = 'password fields is required';
        };
        res.status(400); 
        throw new Error(errorMessgae);
    }   
    const checkUser = await Admin.findOne({email});
    if(checkUser){
        res.status(400); 
        throw new Error("User is already exist");
    }
    const hasPassword = await bcrypt.hash(password,10);
    const userRegister = await Admin.create({
        name,
        email,
        password:hasPassword
    });
    if(userRegister){
        res.status(201).json({"user_id":userRegister._id, "email":userRegister.email});
    }else{
        res.status(400); 
        throw new Error("user is already exist");
    }
});

module.exports = { loginAdmin, registerUser }