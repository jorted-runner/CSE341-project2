const mongodb = require('../database/db');
const ObjectId = require('mongodb').ObjectId;

// Get all read books
async function getAllReadBooks(req, res) {
    try {
        const result = await mongodb.getDatabase().db().collection('books_read').find();
        const books = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Failed to fetch books' });
    }
}

// Add a book
async function addBookRead(req, res) {
    try {
        const newBook = {
            Title: req.body.title,
            Author: req.body.author,
            Date_Finished: req.body.date_finished,
            Rating: req.body.rating,
            Review: req.body.review
        };
        const result = await mongodb.getDatabase().db().collection('books_read').insertOne(newBook);
        res.status(200).json({ message: 'New read book added', bookId: result.insertedId });
    } catch (error) {
        console.error('Error adding new book:', error);
        res.status(500).json({ message: 'Failed to add new book' });
    }
}


module.exports = { getAllReadBooks, addBookRead }