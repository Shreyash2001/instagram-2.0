const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const storyRoutes = require("./routes/storyRoutes");
const ImageKit = require('imagekit');


app.use(express.json());  
dotenv.config();
connectDB();

app.use("/api/stories", storyRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

const imagekit = new ImageKit({
    urlEndpoint: process.env.URL_ENDPOINT,
    publicKey:  process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
  }); 

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/auth', function (req, res) {
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
  });


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started successfully on Port ${port}`));