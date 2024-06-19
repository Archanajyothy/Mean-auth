import User from '../models/User.js';
import { createError } from '../utils/error.js';
import { createSuccess } from '../utils/success.js';

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return next(createSuccess(200, "All users",users));
    } catch (error) {
        return next(createError(500, "Internal server error")); 
    }
}

export const getById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user)
            return next(createError(404, "User not found"));
        return next(createSuccess(200, "Single user", user));
    } catch (error) {
        return next(createError(500, "Internal server error"));
    }
}