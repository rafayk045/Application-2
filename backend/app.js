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
//FOR USER
app.get('/lists', (req, res)=> {
    List.find({}) // all the records in the database
    .then(lists => res.send(lists))
    .catch((error) => console.log.error());
});

app.post('/lists', (req, res)=> { 
    (new List({ 'title': req.body.title}))
        .save()
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
    //     const updateTitle = new List();
    //     updateTitle.title = req.body.title;
    //     updateTitle.save();
    // console.log('updateTitle',updateTitle);
});

app.get('/lists/:listId', (req,res) => {
    List.find({ _id: req.params.listId })
    .then((list) => res.send(list))
    .catch((error) => console.log(error));
});

app.patch('/lists/:listId', (req,res) => {
    List.findOneAndUpdate({ _id: req.params.listId }, { $set: req.body})
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});

app.delete('/lists/:listId', (req,res) => {
    const deleteTasks = (list) => {
        Task.deleteMany({_listId: list._id})
        .then(() => list)
        .catch((error) => console.log(error));
    };


    List.findByIdAndDelete(req.params.listId)
        .then((list) => res.send(deleteTasks(list)))
        .catch((error) => console.log(error));
});

//FOR TASK
//http://localhost:3000/lists/:listId/tasks/:taskId'

//get all the tasks
app.get('/lists/:listId/tasks',(req, res) => {
    Task.find({ _listId: req.params.listId })
    .then((tasks) => res.send(tasks))
    .catch((error) => console.log(error));
});

//save all the tasks
app.post('/lists/:listId/tasks',(req, res) => {
    (new Task({ '_listId': req.params.listId, 'title': req.body.title}))
    .save()
    .then((tasks) => res.send(tasks))
    .catch((error) => console.log(error));
});

//get one task
app.get('/lists/:listId/tasks/:taskId', async (req,res)  => {
    const data = await Task.findOne({ _listId : req.params.listId, _id : req.params.taskId });
    console.log('jhgjhghjghjhjgjhj',data);
    res.send(data);
    // Task.findOne({ _listid: req.params.listId, _id: req.params.taskId })
    // .then((task) => res.send(task))
    // .catch((error) => console.log(error));
});

app.patch('/lists/:listId/tasks/:taskId', async (req,res)  => {
    const data = await Task.findOneAndUpdate({ _listId: req.params.listId, _id : req.params.taskId }, {$set: req.body});
    console.log('..',data);
    res.send(data);
    
    // Task.findOneAndUpdate({ _listid: req.params.listId, _id: req.params.taskId }, {$set: req.body})
    //     .then((task) => res.send(task))
    //     .catch((error) => console.log(error));
    

});

app.delete('/lists/:listId/tasks/:taskId', (req,res) => {
    Task.findByIdAndDelete({ _listId : req.params.listId, _id : req.params.taskId })
        .then((task) => res.send(task))
        .catch((error) => console.log(error));
});

app.listen(3000, () => console.log("Server Connected on port 3000 right now"));