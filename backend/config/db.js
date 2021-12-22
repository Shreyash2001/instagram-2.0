const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology : true,
            useNewUrlParser : true,
        });
        console.log(`MongoDB connected successfully on ${conn.connection.host}`)
    } catch (error) {
        console.log(`Something went wrong with the database ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;