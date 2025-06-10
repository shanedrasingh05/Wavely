const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")

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


userRouter.get("/feed", userAuth, async(req,res)=>{
  try{
    // user should see all user cards except
    // his own card
    //  his connection
    // ignored People
    // allready rent connection request.


    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit >50 ? 50 : limit;

    const skip = (page-1)*limit;



    // find all connection requests (rent + received)
    const connectionRequests = await ConnectionRequest.find({

      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],

    }).select("fromUserId toUserId");

    const hideUserFromFeed = new Set();
    connectionRequests.forEach((req)=>{
      hideUserFromFeed.add(req.fromUserId.toString()),
      hideUserFromFeed.add(req.toUserId.toString())
    });

    // console.log(hideUserFromFeed)

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(USER_SAVE_DATA).skip(skip).limit(limit);

    res.send(users);
    // res.send(connectionRequests);




  }catch(err){
    res.status(400).json({message: err.message});
  }
})



module.exports = userRouter;
