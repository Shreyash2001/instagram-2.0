const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");


app.use(express.json());  
dotenv.config();
connectDB();

app.use("/api/users", userRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started successfully on Port ${port}`));