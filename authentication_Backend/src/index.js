const express = require("express");
require("dotenv").config(); // Load environment variables
const cors = require("cors");
require("./db/mongoose"); // Connect to MongoDB
const passport = require("passport"); // Import Passport directly
const userRouter = require("./routers/user");
const bookRouter = require("./routers/books"); // Correctly import the bookRouter
const path = require("path"); // Add this for serving HTML files

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // Correct path for serving HTML
});

app.use(passport.initialize());

// CORS should be the first middleware defined
app.use(cors());

// Handle preflight requests
app.options("*", cors());

// Register the routers
app.use(userRouter);
app.use(bookRouter); // Ensure bookRouter is correctly passed

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
