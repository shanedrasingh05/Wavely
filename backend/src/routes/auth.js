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

    const savedUser = await user.save();

    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true, // Cookie is not accessible via JavaScript
      secure: true, // Cookie is only sent over HTTPS
      sameSite: "none",
    });

    // res.send(user);

    res.json({message: "User registered successfully", data: savedUser});
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
        httpOnly: true, // Cookie is not accessible via JavaScript
        secure: true, // Cookie is only sent over HTTPS
        sameSite: "none",
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
    httpOnly: true, // Cookie is not accessible via JavaScript
    secure: true, // Cookie is only sent over HTTPS
    sameSite: "none",
  });
 res.send("Logout Successfull");
 

})

module.exports = authRouter;  



