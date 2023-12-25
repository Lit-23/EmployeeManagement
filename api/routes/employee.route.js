import express from "express";
import { addEmployee, signin, signout, test } from "../controller/employee.controller.js";

const router = express.Router();

router.get('/', test);
router.post('/add-employee', addEmployee);
router.post('/sign-in', signin);
router.get('/sign-out', signout);

export default router;