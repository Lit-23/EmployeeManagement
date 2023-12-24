import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
    default: "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  // password is the company ID
  password: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    type: Number,
    required: true,
  },
}, {timestamps: true});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;