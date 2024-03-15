const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE_URL}`
    );
    console.log(
      `\n Mongo connected !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Mongo connection failed: ", error);
  }
};

module.exports = connectDB;
