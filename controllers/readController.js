const mongodb = require('../database/db');
const ObjectId = require('mongodb').ObjectId;

// Get all read books
async function getAllReadBooks(req, res) {
    //#swagger.tags=['ReadBooks']
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

// Get read book by ID
async function getReadByID(req, res) {
	//#swagger.tags=['ReadBooks']
	try {
		const bookID = new ObjectId(req.params.id);
		const result = await mongodb
			.getDatabase()
			.db()
			.collection('books_read')
			.find({ _id: bookID });
		const book = await result.toArray();
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(book);
	} catch (error) {
		console.error('Error fetching books:', error);
		res.status(500).json({ message: 'Failed to fetch books' });
	}
}

// Add a read book
async function addBookRead(req, res) {
	//#swagger.tags=['ReadBooks']
	try {
		const newBook = {
			Title: req.body.title,
			Author: req.body.author,
			Date_Finished: req.body.date_finished,
			Rating: req.body.rating,
			Review: req.body.review,
		};
		const result = await mongodb
			.getDatabase()
			.db()
			.collection('books_read')
			.insertOne(newBook);
		res
			.status(200)
			.json({ message: 'New read book added', bookId: result.insertedId });
	} catch (error) {
		console.error('Error adding new book:', error);
		res.status(500).json({ message: 'Failed to add new book' });
	}
}

// Update a single read book by ID
async function updateReadBookByID(req, res) {
	//#swagger.tags=['ReadBooks']
	try {
		const bookID = new ObjectId(req.params.id);
		const newBook = {
			Title: req.body.title,
			Author: req.body.author,
			Date_Finished: req.body.date_finished,
			Rating: req.body.rating,
			Review: req.body.review,
		};
		const result = await mongodb
			.getDatabase()
			.db()
			.collection('books_read')
			.updateOne({ _id: bookID }, { $set: newBook });
		res.status(200).json('Read Book Updated');
	} catch (error) {
		console.error('Error adding new book:', error);
		res.status(500).json({ message: 'Failed to update book.' });
	}
}

// Delete a single read book by ID
async function deleteReadBook(req, res) {
	//#swagger.tags=['ReadBooks']
	const bookID = new ObjectId(req.params.id);
	const result = await mongodb
		.getDatabase()
		.db()
		.collection('books_read')
		.deleteOne({ _id: bookID });
	res.status(200).json('Read Book Removed');
}


module.exports = { getAllReadBooks, getReadByID, addBookRead, updateReadBookByID, deleteReadBook };