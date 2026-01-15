import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./src/config/db.js";
import cors from "cors";
import authRouter from "./src/routes/routes.js";
import morgan from "morgan";
import contactRouter from './src/routes/publicRoutes.js'

const app = express(); // main server

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use(morgan("dev"));

app.use("/auth", authRouter); // Role based access control /auth, /restaurant, /rider, /customer
app.use("/public", contactRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Server is sendig response" });
});

app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Something went wrong";
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ message: ErrorMessage });
});

app.listen(PORT, () => {
  console.log(`Server is started at port : ${PORT}`);
  connectDB();
});
