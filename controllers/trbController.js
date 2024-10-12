const mongodb = require('../database/db');
const ObjectId = require('mongodb').ObjectId;

// Get all tbr books
async function getAllTbrBooks(req, res) {
    //#swagger.tags=['TbrBooks']
    try {
        const result = await mongodb.getDatabase().db().collection('books_tbr').find();
        const books = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Failed to fetch books' });
    }
}

// Get tbr book by ID
async function getTbrByID(req, res) {
	//#swagger.tags=['TbrBooks']
	try {
		const bookID = new ObjectId(req.params.id);
		const result = await mongodb
			.getDatabase()
			.db()
			.collection('books_tbr')
			.find({ _id: bookID });
		const book = await result.toArray();
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(book);
	} catch (error) {
		console.error('Error fetching books:', error);
		res.status(500).json({ message: 'Failed to fetch books' });
	}
}

// Add a tbr book
async function addBookTbr(req, res) {
	//#swagger.tags=['TbrBooks']
	try {
		const newBook = {
			Title: req.body.title,
			Author: req.body.author,
			Date_Added: req.body.date_finished,
		};
		const result = await mongodb
			.getDatabase()
			.db()
			.collection('books_tbr')
			.insertOne(newBook);
		res
			.status(200)
			.json({ message: 'New TBR book added', bookId: result.insertedId });
	} catch (error) {
		console.error('Error adding new book:', error);
		res.status(500).json({ message: 'Failed to add new book' });
	}
}

// Update a single tbr book by ID
async function updateTbrBookByID(req, res) {
	//#swagger.tags=['TbrBooks']
	try {
		const bookID = new ObjectId(req.params.id);
		const newBook = {
			Title: req.body.title,
			Author: req.body.author,
			Date_Added: req.body.date_finished,
		};
		const result = await mongodb
			.getDatabase()
			.db()
			.collection('books_tbr')
			.updateOne({ _id: bookID }, { $set: newBook });
		res.status(200).json('TBR Book Updated');
	} catch (error) {
		console.error('Error adding new book:', error);
		res.status(500).json({ message: 'Failed to update book.' });
	}
}

// Delete a single tbr book by ID
async function deleteTbrBook(req, res) {
	//#swagger.tags=['TbrBooks']
	const bookID = new ObjectId(req.params.id);
	const result = await mongodb
		.getDatabase()
		.db()
		.collection('books_tbr')
		.deleteOne({ _id: bookID });
	res.status(200).json('TBR Book Removed');
}


module.exports = {
	getAllTbrBooks,
	getTbrByID,
	addBookTbr,
	updateTbrBookByID,
	deleteTbrBook,
};