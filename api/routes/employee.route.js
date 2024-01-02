import express from "express";
import { addEmployee, updateEmployee, signin, signout, test, getEmployeeList, deleteEmployee, findEmployee } from "../controller/employee.controller.js";
// import { verifyToken } from "../utils/verifyEmployee.js";

const router = express.Router();

router.get('/', test);
router.post('/add-employee', addEmployee);
router.post('/sign-in', signin);
// router.post('/update/:id', verifyToken, updateEmployee);
router.post('/find/:id', findEmployee);
router.post('/update/:id', updateEmployee);
router.get('/sign-out', signout);
router.get('/list', getEmployeeList);
router.delete('/delete/:id', deleteEmployee);

export default router;