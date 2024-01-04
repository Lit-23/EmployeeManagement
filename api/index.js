import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config();

import employeeRoutes from "./routes/employee.route.js"

mongoose.connect(`${process.env.MONGO}`)
  .then(() => {
    console.log('Connected to mongoDB')
  })
  .catch((err) => {
    console.log(err);
});

// const __dirname = path.resolve();

const app = express();

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
// });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

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