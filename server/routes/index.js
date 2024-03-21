var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


/*

router.put("/students/:id", (req, res) => {
  const studentId = req.params.id;
 
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


router.delete("/students/:id", (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log("Student deleted!");
      res.status(204).send(); // Send back only status code 204 indicating that resource is deleted
  	})
    .catch((error) => {
      console.error("Error while deleting the Student ->", error);    
    	res.status(500).json({ error: "Deleting student failed" })
  	});
});

*/
