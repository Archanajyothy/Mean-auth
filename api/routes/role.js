import express from 'express';
import Role from '../models/Role.js';
import { createRole, updateRole, getAllRoles, deleteRole } from '../controllers/role.controller.js';
import { verifyAdmin } from '../utils/verifyToken.js';

//create role
const router = express.Router();
router.post('/create', verifyAdmin, createRole);

//Update role in DB
router.put('/update/:id', verifyAdmin, updateRole);

//get all the roles from DB
router.get('/getAll', getAllRoles);

//delete role from DB
router.delete('/deleteRole/:id', verifyAdmin, deleteRole);

export default router;