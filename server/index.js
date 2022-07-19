const express=require("express")
const app= express()

const mongoose=require("mongoose")
//const exercises=require("./Exercises.js")
const ExerciseModel=require("./models/Exercises")



const cors= require('cors')

app.use(express.json());
app.use(cors());

require('dotenv').config();
console.log(process.env.DB);

mongoose.connect(
  process.env.DB
)

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));


// const ExerciseSchema= new mongoose.Schema({
//   name:
//     String,
//   type:
//     String
//
//
//
// })
//
// const ExerciseModel= mongoose.model("exercises",ExerciseSchema);


app.listen(process.env.PORT||3001, ()=>{
  console.log("Server running at 3001");
})

app.get("/getExercise", (req, res)=>{
   ExerciseModel.find({},(err, result)=>{
    if(err){
      res.json(err);
    }
    else if(result){
      res.json(result);
    }
    else{
      console.log("No result");
    }
  })
})


app.post("/createExecise",async(req,res)=>{
  console.log(req.body);
  const exercises=req.body
  const newExercise=new ExerciseModel(exercises)
  await newExercise.save()

  res.json(exercises)
})
