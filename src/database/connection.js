import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (error) => {
  console.log("Error", error);
});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});
