const dotenv = require("dotenv");
const express = require("express");

// Configuring dotenv
dotenv.config({
  path: "./.env",
});

// express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Port Running on process.env.PORT
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
