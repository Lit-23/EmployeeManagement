export const test = (req, res) => {
  res.json({
    message: 'API is working!'
  })
};

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Employee from "../models/employee.model.js";
import errorHandler from "../utils/error.js";

export const addEmployee = async (req, res, next) => {
  // request content/body
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

  // hashed the password using bcryptjs for security
  const hashedPassword = bcryptjs.hashSync(ID, 10);
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
    password: hashedPassword,
    designation,
  });

  try {
    // save the employee to the mongodb database
    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully!' });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // verify employee
    const validEmployee = await Employee.findOne({ email });
    if(!validEmployee) return next(errorHandler(401, 'User not Found!'));

    // verify password
    const validPassword = bcryptjs.compareSync(password, validEmployee.password);
    if(!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    // generate token
    const token = jwt.sign({ id: validEmployee._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validEmployee._doc;

    // 1 day sign in expiry date
    const expiryDate = new Date(Date.now() + 86400000); 

    // response
    res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};