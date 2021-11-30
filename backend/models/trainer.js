const mongoose = require('mongoose');

const trainerSchema = mongoose.Schema({
    name:String,
    email:String,
    age:String,
    speciality:String,
    phone:String,
});

const trainer = mongoose.model('Trainer',trainerSchema);

module.exports = trainer;