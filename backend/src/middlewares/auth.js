const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Get token from cookies
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send({ error: "Please login!" });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token:", decoded);

    // Fetch user using decoded _id
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error("User not found");
    }

    // Attach user to request object
    req.user = user;

    next();
  } catch (err) {
    res.status(400).send({ error: "Auth Error: " + err.message });
  }
};

//   } catch (err) {
//       res.status(400).send({ "Auth Error: " err.message });
//     // console.error("Auth Error:", err.message);
//     // next(err); // Pass error to global error handler
//   }
// };

module.exports = { userAuth };
