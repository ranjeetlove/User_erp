const aysncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = aysncHandler(async(req, res, next)=>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    console.log(token,'token');
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, 'ranjeet@123', (err, decoded) =>{
            if(err){
                res.status(401)
                throw new Error("user is not authoried");
            }
            req.checkUser = decoded.checkUser;
            next();
        })

        if(!token){
            res.status(401); 
            throw new Error("Token is missing or wrong token is provided");
        }
    }else{
        res.status(401); 
        throw new Error("Header is missing plase pass the header");
    }
})

module.exports = validateToken;