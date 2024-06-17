import express from 'express';
import Role from '../models/Role.js';

//create role
const router = express.Router();
router.post('/create', async (req, res, next) => {
    try {
        if(req.body.role && req.body.role != ''){
            const newRole = new Role(req.body);
            await newRole.save();
            return res.send("Role created")
        }else{
            return res.send("Bad request")
        }
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
});

//Update role in DB
router.put('/update/:id', async (req, res, next) => {
    try {
        const role = await Role.findById({_id: req.params.id});
        if(role){
            const newData = await Role.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            );
            return res.status(200).send("Role updated!");
        }else{
            return res.status(404).send("Role not found!");
        }
    } catch (error) {
        return res.status(500).send("Internal server error!");
    }
})

export default router;