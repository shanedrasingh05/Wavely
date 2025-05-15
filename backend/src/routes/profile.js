const express = require("express");
const User = require("../models/user.js")
const { userAuth } = require("../middlewares/auth.js")



const profileRouter = express.Router();

// Get API GET /profile - get user profile by userId from database
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}); 


module.exports = profileRouter;