const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const requestRouter = express.Router();
const User = require("../models/user.js");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid Status type: " + status });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // if there  is an exitsing  connectionRequest
        const existingConnectionRequest = await ConnectionRequest.findOne({
          $or: [
            { fromUserId: fromUserId, toUserId: toUserId },
            { fromUserId: toUserId, toUserId: fromUserId },
          ]
        
        });

        if (existingConnectionRequest) {
          return res.status(400).json({
            message: "Connection request already exists",
          });
        }




      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: req.user.firstName+" " + "is" +" "+ status + " to " + toUser.firstName,
        // message: `${req.user.firstName} sent the connection request successfully!`,
        data,
      });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
);

module.exports = requestRouter;
