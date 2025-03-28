
require("dotenv").config();
const express = require("express");

const app = express();

// Middleware (optional)

app.use(express.json());

app.use("/", (req, res) => {
  res.send("Hello from the server!");
})

// Start Server

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})


