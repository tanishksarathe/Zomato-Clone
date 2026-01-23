import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./src/config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/routes.js";
import morgan from "morgan";
import contactRouter from "./src/routes/publicRoutes.js";
import userRouter from "./src/routes/userRouter.js";

const app = express(); // main server

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials:true,
  }),
);

app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"));

app.use("/auth", authRouter); // Role based access control /auth, /restaurant, /rider, /customer
app.use("/public", contactRouter);
app.use("/user", userRouter);

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
