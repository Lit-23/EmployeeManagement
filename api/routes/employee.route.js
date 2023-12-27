import express from "express";
import { addEmployee, updateEmployee, signin, signout, test, getEmployeeList } from "../controller/employee.controller.js";
import { verifyToken } from "../utils/verifyEmployee.js";

const router = express.Router();

router.get('/', test);
router.post('/add-employee', addEmployee);
router.post('/sign-in', signin);
router.post('/update/:id', verifyToken, updateEmployee);
router.get('/sign-out', signout);
router.get('/list', getEmployeeList);

export default router;