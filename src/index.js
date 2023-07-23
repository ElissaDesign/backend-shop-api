import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import connectDB from "./database/connection.js";
import "./database/connection.js";
import router from "./routes/index.js";

dotenv.config();

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  res.send("Welcome Shopping page");
});

app.listen(PORT, () => {
  console.log(`server at http://localhost:${PORT}`);
});

export default app;
