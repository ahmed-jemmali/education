const mongoose = require('mongoose');
const courseSchema = mongoose.Schema({
    name: String,
    description: String,
    trainerName: String,
    price: String,
    startAt: String,
    capacity: String,
    image:String,
    
});

const course = mongoose.model("Course", courseSchema);

module.exports = course;