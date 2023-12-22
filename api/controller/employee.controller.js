export const test = (req, res) => {
  res.json({
    message: 'API is working!'
  })
};

import Employee from "../models/employee.model.js";

export const addEmployee = async (req, res, next) => {
  const { firstName, lastName } = req.body;
  const newEmployee = new Employee({ firstName, lastName });
  try {
    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully!' });
  } catch (error) {
    console.log(error);
  }
};