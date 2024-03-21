const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohort.model");
const Student = require("../models/Student.model");

//Get all cohorts
router.get("/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).json({ errorMsg: "Failed to retrieve cohorts", error });
    });
});

//Create new cohort
router.post("/cohorts", (req, res, next) => {
  const {
    cohortSlug, cohortName, program, format, campus, startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;
  
  Cohort.create({
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  })
    .then((newCohort) => {
      console.log("Cohort added ---->", newCohort);
      res.json(newCohort);
    })
    .catch((err) => {
      console.error("Error while adding the cohort ->", err);
      res.status(500).json({ error: "Failed to add the cohort" });
    });
});


//Get cohort by ID
router.get("/cohorts/:cohortId", (req, res, next) => {
  Cohort.findById(req.params.cohortId)
    .then((cohort) => {
      console.log("Found cohort ->", cohort);
      res.json(cohort);
    })
    .catch((error) => {
      console.error("Failed to retrieve cohort ->", error);
      res.json({ errorMsg: "Failed to retrieve cohort", error });
    });
});

//Update Cohort by Id
router.put("/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;

  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      console.log("Updated Cohort ->", updatedCohort);

      res.status(204).json(updatedCohort);
    })
    .catch((error) => {
      console.error("Error while updating the cohort ->", error);
      res.status(500).json({ error: "Failed to update the cohort" });
    });
});

// Delete Cohort by ID
router.delete("/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;

   Cohort.findByIdAndDelete(cohortId)
    .then((deletedCohortId) => {
      console.log("Cohort deleted!");
      res.status(204).json(deletedCohortId); // Send back only status code 204 indicating that resource is deleted
  	})
    .catch((error) => {
      console.error("Error while deleting the Cohort ->", error);    
    	res.status(500).json({ error: "Deleting Cohort failed" })
  	});
});

// STUDENTS vvv

// Get all
router.get("/students", (req, res) => {
  Student.find({})
    .populate('cohort')
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ errorMsg: "Failed to retrieve students", error });
    });
});

router.post("/students", (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects,
  } = req.body;

  Student.create({
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects,
  })
    .then((newStudent) => {
      console.log("Student added ->", newStudent);
      res.json(newStudent);
    })
    .catch((err) => {
      console.error("Error while adding the student ->", err);
      res.status(500).json({ error: "Failed to add the student" });
    });
});

// Get all students for a given cohort
router.get("/students/cohort/:cohortId", (req, res, next) => {
  Student.find({ cohort: req.params.cohortId })
    .populate('cohort')
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      res.json({ errorMsg: "Failed to retrieve students ->", error });
    });
});

// Get a student by it's ID
router.get("/students/:studentId", (req, res, next) => {
  const studentId = req.params.studentId;
  
  Student.findById(studentId)
    .populate('cohort')
    .then((student) => {
      console.log("Found student ->", student);
      res.json(student);
    })
    .catch((error) => {
      console.error("Failed to retrieve student ->", error);
      res.json({ errorMsg: "Failed to retrieve student", error });
    });
});

// Update a specific student by it's ID
router.put("/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  Student.findByIdAndUpdate(studentId, req.body, { new: true })
    .then((updatedStudent) => {
      console.log("Updated Student ->", updatedStudent);

      res.status(204).json(updatedStudent);
    })
    .catch((error) => {
      console.error("Error while updating the student ->", error);
      res.status(500).json({ error: "Failed to update the student" });
    });
});

// Delete a specific student by it's ID
router.delete("/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  Student.findByIdAndDelete(studentId)
    .then((deletedStudentId) => {
      console.log("Student deleted!");
      res.status(204).json(deletedStudentId); // Send back only status code 204 indicating that resource is deleted
  	})
    .catch((error) => {
      console.error("Error while deleting the Student ->", error);    
    	res.status(500).json({ error: "Deleting student failed" })
  	});
});

module.exports = router;