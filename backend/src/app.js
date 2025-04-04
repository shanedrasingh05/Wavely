const express = require("express")
require("dotenv").config();
const connectDB = require("./config/database.js")
const app = express();  
const User = require("./models/user.js")
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");



// Middleware

app.use(express.json());
app.use(cookieParser());




// sign API POST /signup - create a new user in database
app.post("/signup", async(req, res) => {
      // console.log(req.body);
try {
      // Validate the data
  validateSignUpData(req);


  const  { firstName,lastName,emailId,password } = req.body;

  // Encrypting password
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);




 



  // Creating a instance of User model 
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: hashPassword,
  });
  await user.save()
  res.send("User registered successfully");
}catch (err) {
  res.status(400).send("Error: " + err.message);
}

})

// Login API POST /login - authenticate user in database
app.post("/login", async (req, res) => {
 try{

  const {emailId, password } = req.body;

  const user = await User.findOne({emailId: emailId});
  if (!user){
    throw new Error("Invalid Credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(isPasswordValid){

    // Generate JWT token


    // Add the token to cookies and send the response with the user 
    res.cookie("token", "skjhfgdgjkbmnkjbubbcdj62902bs23l2002");









    res.send("User logged in successfully");
  }

  else{
    throw new Error("Invalid Credentials");
  }







  }catch (err) {

    res.status(400).send("Error: " + err.message);
  }
})

// Get API GET /profile - get user profile by userId from database
app.get("/profile", async (req, res) => {
  const cookies = req.cookies;

  const {token} = cookies;
  // validate my token

  
   

  console.log(cookies);
  res.send("Reading Cookies")

})


// Get API GET /user - get user by email from databas
app.get("/user", async (req, res) => {

  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });  
    if(!user) {
      res.status(404).send("User not found");
  }else {
    res.send(user);
  }
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});                 

app.get("/feed", async (req, res) => {

  try {
    const users = await User.find({});
    res.send(users);

  }catch (err) {
    res.status(400).send("Something Went Wrong");
   }
});


// delete API DELETE /user - delete user by userId from database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if(!user) {
      res.status(404).send("User not found");
    }else {
      res.send("User deleted successfully");
    }
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
})

// update API Patch /user - update user by userId in database
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  // console.log(data);

  try {
    const allowedUpdates = [
      "skills",
      "photoUrl",
      "about",
      "age",
      "gender",
    ];

    const isAllowedUpdate = Object.keys(data).every((k) =>
      allowedUpdates.includes(k)
    );
    if (!isAllowedUpdate) {
      throw new Error("Update not allowed");
    }

    if(data?.skills.length>10) {
      throw new Error("Skills array should not exceed 10 items");
    }



    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: true,
      runValidate: true,
    });

    res.send("User Update Successfully");
  } catch (err) {
    res.status(400).send("Update Failed:" + err.message);
  }
});













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
