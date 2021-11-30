const express = require('express');

const router = express.Router();

const Course = require('../models/course');

const multer = require('multer');

const request = require("request");

const MIME_TYPE = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
};

const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
        cb(null, imgName);
    },
});


//getAllCoureses
router.get('/allCourses', (req, res) => {
    console.log("Here in get all courses");
    Course.find((err, docs) => {
        if (err) {
            console.log('Error into DB');
        } else {
            res.status(200).json({
                coursesBE: docs
            })

        }
    });

});


//getCourseById
router.get('/getCourse/:id', (req, res) => {
    console.log('Here in get By Id', req.params.id);
    Course.findOne({ _id: req.params.id }).then((result) => {
        console.log("Here result after getCourseById", result);
        res.status(200).json({
            course: result
        })
    });
});


//addCourse
router.post('/addCourse', multer({ storage: storage }).single("image"), (req, res) => {

    // let ref = req.body.startAt+ Date.now() + 'crococoder';
    console.log("req.file.filename", req.file.filename);
    let url = req.protocol + "://" + req.get("host");


    console.log("Here into add", req.body);
    const course = new Course({
        name: req.body.name,
        description: req.body.description,
        trainerName: req.body.trainerName,
        price: req.body.price,
        startAt: req.body.startAt,
        capacity: req.body.capacity,
        image: url + "/images/" + req.file.filename,
    });
    try {
        course.save();
    } catch (error) {
        console.log(error);
    }
});


//deleteCourse
router.delete('/deleteCourse/:id', (req, res) => {
    console.log("Here into delete", req.params.id);
    Course.deleteOne({ _id: req.params.id }).then((result) => {
        console.log("Here result after delete", result);
        res.status(200).json({
            message: "Course deleted with success",
        });
    });
});


//editCourse
router.put('/editCourse/:id', (req, res) => {
    console.log('Here edited course', req.params.id);
    const newCourse = new Course({
        _id: req.body._id,
        name: req.body.name,
        description: req.body.description,
        trainerName: req.body.trainerName,
        price: req.body.price,
        startAt: req.body.startAt,
        capacity: req.body.capacity
    });
    console.log('new obj', newCourse);
    Course.updateOne({ _id: req.params.id }, newCourse).then(
        (result) => {
            console.log('result :', result);
            res.status(200).json({
                message: 'Updated with success'
            })
        }
    )
});



/// Api 
router.get("/countries", (req, res) => {
    console.log("Here into countries");

    var options = {
        url: 'https://app.sportdataapi.com/api/v1/soccer/teams?apikey=90b4e9e0-95ef-11eb-8fee-c576c3f38f70&country_id=48'
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(JSON.parse(body).data);
            res.status(200).json({
                countries: JSON.parse(body).data
            })
        }
    }

    request(options, callback);
});



module.exports = router;