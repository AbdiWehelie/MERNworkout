const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ExerciseSchema= new Schema({
  name:
    String,
  type:
    String
})

const ExerciseModel= mongoose.model('exercises',ExerciseSchema);
module.exports=ExerciseModel
