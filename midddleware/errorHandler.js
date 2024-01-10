const {constants} = require("../constant");

const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode) {
        case constants.VALIDATION_ERROR:
           res.json({title:'for validations', message: err.message, stackTrace: err.stack }) 
          break;
        case constants.NOT_FOUND:
           res.json({title:'404 Not Found', message: err.message, stackTrace: err.stack }) 
        break;  
        case constants.INVALID_DATA:
           res.json({title:'Invalid Data', message: err.message, stackTrace: err.stack }) 
        break;  
        default:
          console.log("no error all good");
     }
}

module.exports = errorHandler;