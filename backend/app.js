const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

const List = require('./database/models/list'); //imported tasks and lists!!
const Task = require('./database/models/task');
app.use(express.json());



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

/*
What we need to be able to do->
List: Create, Update, ReadOne, ReadAll, Delete
Task: Create, Update, ReadOne, ReadAll, Delete
*/
/*
Get -> Get Data
POST -> Save Data
PUT PATCH -> Update Data
DELETE -> Delete data
*/

app.get('/lists', (req, res)=> {
    List.find({}) // all the records in the database
    .then(lists => res.send(lists))
    .catch((error) => console.log.error());
});

app.post('/lists', (req, res)=> {
    (new List({ 'title': req.body.title}))
        .save()
        .then((list) => res.send(list))
        .catch((error) => { });
    //     const updateTitle = new List();
    //     updateTitle.title = req.body.title;
    //     updateTitle.save();
    // console.log('updateTitle',updateTitle);
});
app.listen(3000, () => console.log("Server Connected on port 3000 right now"));