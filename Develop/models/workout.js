const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//name, type, weight, sets, reps, and duration of exercise. If the exercise is a cardio exercise,
// I should be able to track my distance 
const workoutSchema = new Schema({
        day:{
            type : Date,
            default : Date.now
        },
        exercises: 
          [{
            type:{
                type : String,

            } ,
            name: {
                type : String 
            },
            duration: {
                type : Number
            },
            distance: {
                type : Number
            },
            weight: {
                type : Number
            },
            reps: {
                type : Number
            },
            sets: {
                type : Number 
            }
          }]     
},
{
    toJSON: {
        virtuals: true
    }
})

workoutSchema.virtual("totalDuration").get(function(){
   return this.exercises.reduce((total, exercise)=>{
       return total += exercise.duration;
    }, 0)
})

workoutSchema.virtual("combinedWeight").get(function(){
    return this.exercises.reduce((total, exercise)=>{
    return total += exercise.weight;
     }, 0)

 })

 workoutSchema.virtual("totalDistance").get(function(){
    return this.exercises.reduce((total, exercise)=>{
         return total += exercise.distance;
     }, 0)
 })

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;

