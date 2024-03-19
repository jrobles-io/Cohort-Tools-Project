const express = require('express');
const router = express.Router();
const cohorts = require("../cohorts.json")
const students = require("../students.json")
/* GET home page. */
router.get('/cohorts', function(req, res, next) {
  res.json(cohorts);
});

router.get('/students', function(req, res, next) {
    res.json(students);
});


module.exports = router;
