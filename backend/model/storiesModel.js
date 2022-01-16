const mongoose = require("mongoose");
const StoriesSchema = mongoose.Schema({
    user : {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required : true
    },
    file : {
        type: String,
        required : true
    },
    tags : [{
        type : mongoose.Types.ObjectId,
        ref : "User"
    }],
    seen : [{
        type : mongoose.Types.ObjectId,
        ref : "User"
    }],
}, {
    timestamps : true
});

const Story = mongoose.model("Story", StoriesSchema);
module.exports = Story;