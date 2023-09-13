const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Replace with your frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });  
/*^^
CORS - Cross Origin Request Security.
localhost:3000 - backend api
localhost: 4200 - frontend
*/



app.use(express.json());
app.listen(3000, () => console.log("Server Connected on port 3000 right now"));