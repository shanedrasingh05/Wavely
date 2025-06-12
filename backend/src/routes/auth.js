const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // Validate the data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypting password
    const hashPassword = await bcrypt.hash(password, 10);

    // Creating a instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });

    await user.save();
    res.send("User registered successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      res.send(user);
      // res.send("User logged in successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});


authRouter.post("/logout", async (req, res) =>{
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  })
 res.send("Logout Successfull");
 

})

module.exports = authRouter;  




// const express = require('express')
// const {validateSignUpData} = require("../utils/validation");
// const User = require("../models/user.js")
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const authRouter = express.Router();

// authRouter.post("/signup", async (req, res) => {
//   // console.log(req.body);
//   try {
//     // Validate the data
//     validateSignUpData(req);

//     const { firstName, lastName, emailId, password } = req.body;

//     // Encrypting password
//     const hashPassword = await bcrypt.hash(password, 10);
//     // console.log(hashPassword);

//     // Creating a instance of User model
//     const user = new User({
//       firstName,
//       lastName,
//       emailId,
//       password: hashPassword,
//     });
//     await user.save();
//     res.send("User registered successfully");
//   } catch (err) {
//     res.status(400).send("Error: " + err.message);
//   }
// });

// // Login API POST /login - authenticate user in database
// authRouter.post("/login", async (req, res) => {
//     try{

//      const {emailId, password } = req.body;

//      const user = await User.findOne({emailId: emailId});
//      if (!user){
//        throw new Error("Invalid Credentials");
//      }

//      const isPasswordValid = await user.validatePassword(password);
//      // const isPasswordValid = await bcrypt.compare(password, user.password);

//      if(isPasswordValid){

//        // Generate JWT token
//        const token= await user.getJWT();
//        // const token= await jwt.sign({ _id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "7d"});
//        // console.log(token);

//        // Add the token to cookies and send the response with the user
//        res.cookie("token", token,{
//          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),

//        });

//        res.send("User logged in successfully");
//      }

//      else{
//        throw new Error("Invalid Credentials");
//      }

//      }catch (err) {

//        res.status(400).send("Error: " + err.message);
//      }
// });

// module.export = authRouter;
