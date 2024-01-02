export const test = (req, res) => {
  res.json({
    message: 'API is working!'
  })
};

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Employee from "../models/employee.model.js";
import errorHandler from "../utils/error.js";
import { MongoClient } from "mongodb";

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
    salary,
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
    salary,
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

// find employee by id
export const findEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

// update employee
export const updateEmployee = async (req, res, next) => {
  // if(req.employee.id !== req.params.id) {
  //   return next(errorHandler(401, "You can update only your account!"));
  // }
  try {
    // if there is a new password, it will be hashed first before saving to the database
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, {
      $set: {
          profilePicture: req.body.profilePicture,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          birthDate: req.body.birthDate,
          gender: req.body.gender,
          address: req.body.address,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          ID: req.body.ID,
          password: req.body.password,
          designation: req.body.designation
        }
      },
      { new: true }     
    );

    // separate the password and send the data to the client side except password
    const { password, ...rest } = updatedEmployee._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// signout
export const signout = async (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};

// get the collection of all employees
export const getEmployeeList = async (req, res, next) => {
  const mongoURI = process.env.MONGO;
  const client = new MongoClient(mongoURI);
  try {
    await client.connect();
    const database = client.db('employee_list');
    const collection = database.collection('employees');
    const data = await collection.find().toArray();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// delete employee
export const deleteEmployee = async (req, res, next) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};