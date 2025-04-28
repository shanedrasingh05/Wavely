// ****************************************MY Code **************************************

const express = require("express")
require("dotenv").config();
const connectDB = require("./config/database.js")
const app = express();
const User = require("./models/user.js")
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

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
    const token= await jwt.sign({ _id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "7d"});
    console.log(token);

    // Add the token to cookies and send the response with the user
    res.cookie("token", token);

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

  const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET_KEY);

  const { _id } = decodedMessage;
  console.log('logged In user:', _id);

  

  // console.log(decodedMessage)



  // console.log(cookies);
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






// const express = require("express");
// require("dotenv").config();
// const connectDB = require("./config/database");
// const User = require("./models/user");
// const { validateSignUpData } = require("./utils/validation");
// const bcrypt = require("bcrypt");
// const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// // Signup API - Create new user
// app.post("/signup", async (req, res) => {
//   try {
//     // Validate signup data
//     validateSignUpData(req.body);

//     const { firstName, lastName, emailId, password } = req.body;

//     // Hash the password
//     const hashPassword = await bcrypt.hash(password, 10);

//     // Create new user
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

// // Login API - Authenticate user
// app.post("/login", async (req, res) => {
//   try {
//     const { emailId, password } = req.body;

//     const user = await User.findOne({ emailId });
//     if (!user) throw new Error("Invalid Credentials");

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) throw new Error("Invalid Credentials");

//     // Generate JWT token
//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
//       expiresIn: "7d",
//     });

//     // Set token in cookies
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });
//     console.log(token);

//     res.send("User logged in successfully");
//   } catch (err) {
//     res.status(400).send("Error: " + err.message);
//   }
// });

// // Profile API - Get user profile by token
// app.get("/profile", async (req, res) => {
//   const { token } = req.cookies;

//   if (!token) return res.status(401).send("Unauthorized");

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await User.findById(decoded._id);
//     if (!user) return res.status(404).send("User not found");

//     res.send(user);
//   } catch (err) {
//     res.status(401).send("Invalid token");
//   }
// });

// // Get user by email (query param)
// app.get("/user", async (req, res) => {
//   const userEmail = req.query.emailId;

//   try {
//     const user = await User.findOne({ emailId: userEmail });
//     if (!user) return res.status(404).send("User not found");

//     res.send(user);
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// // Get all users
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// // Delete user by ID
// app.delete("/user", async (req, res) => {
//   const { userId } = req.body;

//   try {
//     const user = await User.findByIdAndDelete(userId);
//     if (!user) return res.status(404).send("User not found");

//     res.send("User deleted successfully");
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// // Update user by ID
// app.patch("/user/:userId", async (req, res) => {
//   const { userId } = req.params;
//   const data = req.body;

//   try {
//     const allowedUpdates = ["skills", "photoUrl", "about", "age", "gender"];
//     const isAllowedUpdate = Object.keys(data).every((key) =>
//       allowedUpdates.includes(key)
//     );

//     if (!isAllowedUpdate) throw new Error("Update not allowed");

//     if (data?.skills?.length > 10)
//       throw new Error("Skills array should not exceed 10 items");

//     await User.findByIdAndUpdate(userId, data, {
//       new: true,
//       runValidators: true,
//     });

//     res.send("User updated successfully");
//   } catch (err) {
//     res.status(400).send("Update failed: " + err.message);
//   }
// });

// // Connect to MongoDB and start server
// connectDB()
//   .then(() => {
//     console.log("MongoDB Connected...");
//     const port = process.env.PORT || 3001;
//     app.listen(port, () => {
//       console.log(`Server running on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection failed", err);
//   });
