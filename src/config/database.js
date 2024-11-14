const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://tusharkamra:Mongodb123@node-mongo-practice.gjwzk.mongodb.net/tech-connect"
    );
};

module.exports = connectDB;
