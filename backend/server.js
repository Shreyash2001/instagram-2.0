const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
app.use(express.json());  
dotenv.config();
connectDB();






const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started successfully on Port ${port}`));