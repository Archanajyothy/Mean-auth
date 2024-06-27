import Book from "../models/Book.js";
import { createError } from "../utils/error.js"
import { createSuccess } from "../utils/success.js";

export const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        return next(createSuccess(200, "All Books Fetched", books));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
}