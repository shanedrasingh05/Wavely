const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 20,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address:" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter Strong Password :" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 99,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
      validate(value) {
        if (!["Male", "Female", "Other"].includes(value)) {
          throw new Error("Invalid gender. Choose from Male, Female, or Other");
        }
      },
    },
    profileUrl: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/02/44/43/69/240_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    },
    about: {
      type: String,
      default: "This is a sample user profile. Update it as per your needs.",
    },
    skills: [{ type: String }],
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true, // Ensures createdAt cannot be modified later
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } } // Enables automatic timestamping
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;



// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//       minlength: 4,
//       maxlength: 20,
//       trim: true,
//     },
//     lastName: {
//       type: String,
//       trim: true,
//     },
//     emailId: {
//       type: String,
//       required: true,
//       unique: true,
//       match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     age: {
//       type: Number,
//       min: 18,
//       max: 99,
//       trim: true,
//     },
//     gender: {
//       type: String,
//       trim: true,
//       validate(value) {
//         if (!["Male", "Female", "Other"].includes(value)) {
//           throw new Error("Invalid gender. Choose from Male, Female, or Other");
//         }
//       },
//       // enum: ["Male", "Female", "Other"],
//       // default: "Other",
//     },

//     profileUrl: {
//       type: String,
//       default:
//         "https://t4.ftcdn.net/jpg/02/44/43/69/240_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
//     },
//     about: {
//       type: String,
//       default: "This is a sample user profile. Update it as per your needs.",
//     },
//     skills: [{ type: String }],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },

//   { timestamps: true

//   } // add timestamps to the schema.);

// );

// const userModel = mongoose.model("User", userSchema);

// module.exports = userModel;
