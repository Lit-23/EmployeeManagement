import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config(); 

import employeeRoutes from "./routes/employee.route.js"

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to mongoDB')
  })
  .catch((err) => {
    console.log(err);
});

const app = express();

const whitelist = [
  "https://employee-management-client-lyart.vercel.app/dashboard",
  "https://employee-management-client-lyart.vercel.app/profile",
  "https://employee-management-client-lyart.vercel.app/add-employee",
  "https://employee-management-client-lyart.vercel.app/employee-list",
  "https://employee-management-client-lyart.vercel.app/update"
]

app.use(cors(
  {
    origin: whitelist,
    methods: ["POST", "GET", "DELETE"],
    credentials: true
  }
))

app.listen(3000, () => {
  console.log('Server listening to port 3000!')
});

app.use(express.json());

app.use(cookieParser());

app.use('/api/employee', employeeRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  })
});