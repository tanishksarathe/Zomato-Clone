import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./src/config/db.js";

const app = express();  // main server

app.use(express.json());

// app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Server is sendig response" });
});

app.listen(PORT, () => {
  console.log(`Server is started at port : ${PORT}`);
  connectDB();
});
