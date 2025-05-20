const express = require("express");
const User = require("../models/user.js")
const { userAuth } = require("../middlewares/auth.js")
const { validateEditProfileData } = require("../utils/validation.js")



const profileRouter = express.Router();

// Get API GET /profile - get user profile by userId from database
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}); 

// Edit API PATCH /profile/edit
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {

  try{
    
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }
   const loggedInUser = req.user;
      Object.keys(req.body).forEach((key)=>(loggedInUser[key] = req.body[key]))
      await loggedInUser.save();

    // console.log(loggedInUser);  

    res.json({message: `${loggedInUser.firstName}'s profile updated successfully`,
      data: loggedInUser
    });

  }catch(err){
    res.status(400).send("Error: " + err.message);
  }
  
});

module.exports = profileRouter;