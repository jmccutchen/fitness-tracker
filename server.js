const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();
const databaseName = 'workout_db';

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));



app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then(data => {
        console.log(data);
        res.json(data);
    })
})

app.put("/api/workouts/:id", (req, res) => {
    console.log("hit it2")
    db.Workout.find({_id: req.params.id}).then(data => {
        console.log(data[0].exercises)
        //Takes excercise array in database
        var exercises = data[0].exercises;
        //Add body object to array
        exercises.push(req.body);
        //check to see if added last excercise to excercise array
        db.Workout.findOneAndUpdate({_id:req.params.id}, {exercises:exercises}, (data)=>{
            res.json(data);
        })
    })
    
})

app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
    .then()
});

// get workouts in range?
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(data => {
        console.log(data);
        res.json(data);
    })
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, './public/stats.html'));
});

app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, './public/exercise.html'));
});



mongoose
    .connect(process.env.MONGODB_URI ||
     "mongodb://localhost/workout_db", 
     { 
         useNewUrlParser: true 
    })
    .then(() => console.log(`successfully connected to database: ${databaseName}`));



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  