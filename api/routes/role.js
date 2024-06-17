import express from 'express';
import Role from '../models/Role.js';
import { createRole, updateRole, getAllRoles, deleteRole } from '../controllers/role.controller.js';

//create role
const router = express.Router();
router.post('/create', createRole);

//Update role in DB
router.put('/update/:id', updateRole);

//get all the roles from DB
router.get('/getAll', getAllRoles);

//delete role from DB
router.delete('/deleteRole/:id', deleteRole);

export default router;