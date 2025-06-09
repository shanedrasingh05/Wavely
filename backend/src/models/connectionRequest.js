// const mongoose= require('mongoose')

// const connectionRequestSchema = new mongoose.Schema({
    
//     fromUserId:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",  /// Reference to the User collection
//         required: true,
//     },

//     toUserId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },

//     status:{
//         type: String,
//         required: true,
//         enum:{
//             values:["ignored", "interested", "accepted", "rejected"],
//             message:"{VALUE} is not a valid status",
//     },
// },

// },

// {
// timestamps: true
// })

// connectionRequestSchema.pre("save", function (next) {
//   const connectionRequest = this;

//   // Check if the fromUserId is same as to userId
//   if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
//     throw new Error("Cannot send connection request to yourself!");
//   }
//   next();
// });


// const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema)

// module.exports = ConnectionRequestModel



// // module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema)