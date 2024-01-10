const express = require("express");
const app = express();
const port = 5000;
const errorHandler = require("./midddleware/errorHandler");
const conncetDb = require('./config/dbConnection');

app.listen(port, () => { 
    console.log('server is running on port '+ port);
});
conncetDb();

app.use(express.json());// for passing form body
app.use('/api/admin', require('./routes/adminRoutes')); // use for routing
app.use('/api/user', require('./routes/userRoutes')); // use for routing

app.use(errorHandler);

