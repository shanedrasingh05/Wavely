const express = require("express")
require("dotenv").config();
const connectDB = require("./config/database.js")
const app = express();  
const User = require("./models/user.js")

// Middleware

app.use(express.json());




// sign API POST /signup - create a new user in database
app.post("/signup", async(req, res) => {
      // console.log(req.body);
 
  // Creating a instance of User model 
  const user = new User(req.body);
  await user.save()
  res.send("User registered successfully");


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



//   const userEmail = req.query.emailId;

//   try {
//     const users = await User.find({ emailId: userEmail });

//     if(users.length === 0) {
//       res.status(404).send("User not found");

//       } else {
//       res.send(users);
  
//     }
//   } catch (err) {
//     res.status(400).send("Something Went Wrong");
  
// }
// })




//  feed API GET /feed - get all user from database
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
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  console.log(data);

  try{
    await User.findByIdAndUpdate({ _id: userId}, data);
    res.send("User Update Successfully")

  }catch (err) {
    res.status(400).send("Something Went Wrong");
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
