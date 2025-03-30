const express = require("express")
require("dotenv").config();
const connectDB = require("./config/database.js")
const app = express();  
const User = require("./models/user.js")

// Middleware

app.use(express.json());





app.post("/signup", async(req, res) => {
      // console.log(req.body);
 
  // Creating a instance of User model 
  const user = new User(req.body);
  await user.save()
  res.send("User registered successfully");


})
















connectDB()
  .then(() => {
    console.log("MongoDB Connected...");

    // Server Start
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  })
  .catch((err) => {
    console.error("MongoDB can not  connected", err);
  });
