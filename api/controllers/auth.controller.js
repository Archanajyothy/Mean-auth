import Role from "../models/Role.js"
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createSuccess }  from "../utils/success.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
    const role = await Role.find({role : "User"});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        firstName : req.body.firstName,
        lastName : req.body.firstName,
        username : req.body.username,
        email : req.body.email,
        password : hashedPassword,
        roles : role
    });
    await newUser.save();
    return next.createSuccess(200, 'User registered successfully!');
    // return res.status(200).send('User registered successfully!');
}

export const registerAdmin = async (req, res, next) => {
    const role = await Role.find({});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        firstName : req.body.firstName,
        lastName : req.body.firstName,
        username : req.body.username,
        email : req.body.email,
        password : hashedPassword,
        isAdmin : true,
        roles : role
    });
    await newUser.save();
    // return next.createSuccess(200, 'User registered successfully!');
    return res.status(200).send('Admin registered successfully!');
}

export const login =  async (req, res, next) => {
    try {
        const user = await User.findOne({email : req.body.email})
        .populate("roles", "role");
        const {roles} = user;
        if (!user) {
            return next.createError(404, 'User not found!');
            //return res.status(404).send('User not found!');  
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).send('Password is incorrect!');
        }
        const token = jwt.sign(
            {id: user.id, isAdmin: user.isAdmin, roles: roles},
            process.env.JWT_SECRET
        );
        res.cookie("access_token", token,{httpOnly: true})
        .status(200)
        .json({
            status : 200,
            message : "Login success",
            data : user
        });
        // return res.status(200).send('Login success!');
    } catch (error) {
        return res.status(500).send('Something went wrong!');
    }
}