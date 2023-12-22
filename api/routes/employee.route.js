import express from "express";
import { addEmployee, test } from "../controller/employee.controller.js";

const router = express.Router();

router.get('/', test);
router.post('/add-employee', addEmployee)

export default router;