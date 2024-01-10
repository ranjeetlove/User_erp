const mongoose = require('mongoose');

const conncetDb = async ()=>{
    try{
      const coonect  = await mongoose.connect("mongodb://0.0.0.0:27017/janta");
      console.log("DataBase connect:", coonect.connection.host, coonect.connection.name);
    }catch(err){
      console.log('getting error',err);
      process.exit(1);
    }
}

module.exports = conncetDb;