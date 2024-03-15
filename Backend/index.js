require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/mainRouter");
const connectDB = require("./dbConnect");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter);

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("Error: ", error);
      throw error;
    });

    app.listen(3000, () => {
      console.log("Listening on port: 3000");
    });
  })
  .catch((error) => {
    console.log("Connection failed", error);
  });
