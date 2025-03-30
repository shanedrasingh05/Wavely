const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI,

    )
};

module.exports = connectDB;


