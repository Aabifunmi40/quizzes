const mongoose = require("mongoose");

const connectTodb = async () => {
    try {
        let url =`mongodb://localhost:27017/${process.env.DB_NAME}`;
        await mongoose.connect(url);
        console.log("Connected to database")
    } catch (err) {
        console.log("An error occured while connecting",err)
    }
};

module.exports = connectTodb