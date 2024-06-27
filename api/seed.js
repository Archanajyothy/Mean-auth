import BookJson from './Bookstore.book.json' assert { type: "json" };
import Book from './models/Book.js';

export const seedBooksData = async () => {
    try {
        //connection to the database
    //query 
    await Book.deleteMany({});
    await Book.insertMany(BookJson);
    console.log("Data seeded successfully");

    //dicsonnect
    } catch (error) {
        console.log("Error: ", error);
    }
}