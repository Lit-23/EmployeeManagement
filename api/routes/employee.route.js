import express from "express";
import { addEmployee, updateEmployee, signin, signout, test, getEmployeeList, deleteEmployee, findEmployee } from "../controller/employee.controller.js";
// import { verifyToken } from "../utils/verifyEmployee.js";

const router = express.Router();

router.get(baseURL, test);
router.post(`${process.env.baseURL}/add-employee`, addEmployee);
router.post(`${process.env.baseURL}/sign-in`, signin);
// router.post('/update/:id', verifyToken, updateEmployee);
router.post(`${process.env.baseURL}/find/:id`, findEmployee);
router.post(`${process.env.baseURL}/update/:id`, updateEmployee);
router.get(`${process.env.baseURL}/sign-out`, signout);
router.get(`${process.env.baseURL}/list`, getEmployeeList);
router.delete(`${process.env.baseURL}/delete/:id`, deleteEmployee);

export default router;