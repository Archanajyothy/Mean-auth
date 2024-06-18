import Role from "../models/Role.js"
import User from "../models/User.js";
import bcrypt from "bcryptjs";

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
    return res.status(200).send('User registered successfully!');
}

export const login =  async (req, res, next) => {
    try {
        const user = await User.findOne({email : req.body.email});
        if (!user) {
            return res.status(404).send('User not found!');  
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).send('Password is incorrect!');
        }
        return res.status(200).send('Login success!');
    } catch (error) {
        return res.status(500).send('Something went wrong!');
    }
}