const mongodb = require('../database/db');
const ObjectId = require('mongodb').ObjectId;

// Get all read books
async function getAllReadBooks(req, res) {
	const result = await mongodb.getDatabase().db().collection('books_read').find();
	result.toArray().then((books) => {
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(books);
	});
}

// Add a book
async function addBookRead(req, res) {
    const newBook = {
        Title: req.body.title,
        Author: req.body.author,
        Date_Finished: req.body.date_finished,
        Rating: req.body.rating,
        Review: req.body.review
    }
    const result = await mongodb.getDatabase().db().collection('books_read').insertOne(newBook)
    res.status(200).json('New read book added')
}


module.exports = { getAllReadBooks, addBookRead }