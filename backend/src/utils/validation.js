const validator = require("validator");

const validateSignUpData = (req) => {
  if (!req.body) {
    return { success: false, errors: ["Request body is missing"] };
  }

  let { firstName, lastName, emailId, password } = req.body;

  // Trim values to remove extra spaces
  firstName = firstName?.trim();
  lastName = lastName?.trim();
  emailId = emailId?.trim();

  const errors = [];

  if (!firstName || !lastName) {
    errors.push("First name and last name are required");
  }
  if (!emailId || !validator.isEmail(emailId)) {
    errors.push("Invalid email address");
  }
  if (!password || !validator.isStrongPassword(password)) {
    errors.push(
      "Password must be at least 8 characters long, contain a number, a lowercase letter, an uppercase letter, and a special character"
    );
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return { success: true };
};

module.exports = {
  validateSignUpData,
};

// data from signup

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



// const validator = require("validator");

// const validateSignUpData = (req) =>{
//     const { firstName, lastName, emailId, password} = req.body;

//     if(!firstName ||!lastName){
//         throw new Error("First name and last name are required");
//     }
//     else if(!validator.isEmail(emailId)){
//         throw new Error("Invalid email address");
//     }
//     else if(!validator.isStrongPassword(password)){
//         throw new Error("Password must be at least 8 characters long, contain a number, a lowercase letter, an uppercase letter, and a special character");
//     }
// };
// module.exports = {
//     validateSignUpData

// };
