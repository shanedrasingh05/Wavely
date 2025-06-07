const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAVE_DATA = "firstName lastName profileUrl age gender about skills";
// photoUrl

//Get all pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAVE_DATA);
    // }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "about", "skills"]);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});



userRouter.get("/user/connections", userAuth, async (req,res)=>{
  try{

    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        // { toUserId: loggedInUser._id, status: "interested" },
        // { fromUserId: loggedInUser._id, status: "interested" },
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAVE_DATA)
      .populate("toUserId", USER_SAVE_DATA);

    const data = connectionRequests.map((row) =>{
      if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
          return row.toUserId;
      }
      return row.fromUserId;
    })
    
  

    res.json({data});
    // res.json({ data: connectionRequests });

  }
  catch(err){
        res.status(400).send({message: err.massage})
  }
});

module.exports = userRouter;
