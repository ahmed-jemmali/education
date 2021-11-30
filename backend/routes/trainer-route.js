const express = require('express');

const router = express.Router();

const Trainer = require('../models/trainer');

//getAllTrainers
router.get('/allTrainers', (req, res) => {
    console.log("Here in get all trainers");
    Trainer.find((err, docs) => {
        if (err) {
            console.log('Error into DB');
        } else {
            res.status(200).json({
                trainersBE: docs
            })
        }
    });
});

//addTrainers
router.post('/addTrainer', (req, res) => {
    console.log("Here into add", req.body);
    const trainer = new Trainer({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        speciality: req.body.speciality,
        phone: req.body.phone,
    });

    try{
        trainer.save();
    }catch(error){
        console.log(error);
    }
});

module.exports = router;