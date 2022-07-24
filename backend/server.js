const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const storyRoutes = require("./routes/storyRoutes");
const reelRoutes = require("./routes/reelRoutes");
const cors = require('cors');
const sse = require("./sse/sse");
const sseRoute = require("./routes/sseRoute");
const compression = require("compression");


app.use(express.json()); 
app.use(cors()); 
app.use(compression())
dotenv.config();
connectDB();

app.use(sseRoute);
app.use("/api/reels", reelRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);


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

app.delete("/delete", function(req, res) {
  imagekit.deleteFile(req.body.fileId, function(error, result) {
    if(error) console.log(error);
    else console.log(result);
});
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started successfully on Port ${port}`));