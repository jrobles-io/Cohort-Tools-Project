var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const saltRounds = 10;

const User = require('../models/User');

const isAuthenticated = require('../middleware/isAuthenticated');

// Sign up
router.post('/signup', (req, res, next) => {
  
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }
 
  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }
  
  // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }

    // Check the users collection if a user with the same email already exists
  
User.findOne({email})
  .then((foundUser) => {
    // If the user with the same email already exists, send an error response
    if (foundUser) {
      res.status(400).json({ message: "User already exists." });
      console.log('found user ---->', foundUser)
      return;
    }
    //  If the email is unique, proceed to hash the password
    
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    // Create a new user in the database
    // We return a pending promise, which allows us to chain another `then` 
    User.create({email, password: hashedPassword, name }) 
      .then((createdUser) => {

        const { email, name, _id } = createdUser;

        const user = { email, name, _id };

        res.status(201).json({user: user});
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          console.log("There was an error", error);
          res.status(501).json({message: "Provide all fields", error});
        } else if (err.code === 11000) {
          console.log("Duplicate value", error);
          res.status(502).json({message: "Invalid name, password, or email"});
        } else {
          console.log("Error ==>", error);
          res.status(503).json({message: "Unable to sign up user"});
        }
      });
  });
});


router.post('/login', (req, res, next) => {
  const {email, password } = req.body;
  
  if (email === '' || password === '') {
    res.status(400).json({ message})
  };
  
  User.findOne({ email })
  .then((foundUser) => {
    if (!foundUser) {
      res.status(401).json({ message: 'User or password incorrect.' })
      return;
    }  
    
    const passwordCorrect = bcrypt.compareSync(password, foundUser.password)
    
    if (passwordCorrect) {
      
      const { _id, email, name } = foundUser;
      
      const payload = { _id, email, name };
      
      const authToken = jwt.sign(
        payload,
        process.env.SECRET,
        { algorithm: 'HS256', expiresIn: "6h"}
        );
        
        res.status(200).json({ authToken });
      }
      else {
        res.status(401).json({ message: 'Unable to authenticate the user' });
      }
    
    })
    .catch(err => res.status(500).json({ message: 'Internal Server Error'}));
  });
    

  router.get('/verify', isAuthenticated, (req, res, next) => {

    res.status(201).json(req.user)

})


  module.exports = router;








