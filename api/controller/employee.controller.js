export const test = (req, res) => {
  res.json({
    message: 'API is working!'
  })
};

import Employee from "../models/employee.model.js";

export const addEmployee = async (req, res, next) => {
  const { 
    profilePicture, 
    firstName, 
    lastName ,
    birthDate,
    gender,
    address,
    email,
    phoneNumber,
    ID,
    designation,
  } = req.body;
  const newEmployee = new Employee({ 
    profilePicture, 
    firstName, 
    lastName ,
    birthDate,
    gender,
    address,
    email,
    phoneNumber,
    ID,
    password: ID,
    designation,
  });
  try {
    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully!' });
  } catch (error) {
    next(error);
  }
};