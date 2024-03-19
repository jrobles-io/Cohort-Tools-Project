const express = require('express');
const router = express.Router();
const Cohort = require("../models/Cohort.model"); 
const Student = require("../models/Student.model"); 

router.get("/cohorts", (req, res) => {
    Cohort.find({})
      .then((cohorts) => {
        console.log("Retrieved cohorts ->", cohorts);
        res.json(cohorts);
      })
      .catch((error) => {
        console.error("Error while retrieving cohorts ->", error);
        res.status(500).json({ error: "Failed to retrieve cohorts" });
      });
  });


  router.get("/students", (req, res) => {
    Student.find({})
      .then((students) => {
        console.log("Retrieved students ->", students);
        res.json(students);
      })
      .catch((error) => {
        console.error("Error while retrieving students ->", error);
        res.status(500).json({ error: "Failed to retrieve students" });
      });
  });

module.exports = router;
