const validatorHelper = require('./helper');
const mongodb = require('../database/db');
const ObjectId = require('mongodb').ObjectId;

const saveBookRead = (req, res, next) => {
	const validationRule = {
		title: 'required|string',
		author: 'required|string',
		rating: 'required|numeric|max:5',
		review: 'required|string',
		date_finished: 'required|string',
	};
	validatorHelper(req.body, validationRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				message: 'Validation failed',
				data: err,
			});
		} else {
			next();
		}
	});
};

const checkID = (req, res, next) => {
	try {
		const bookID = new ObjectId(req.params.id);
		const validBook = mongodb
				.getDatabase()
				.db()
				.collection('books_read')
				.find({ _id: bookID });
				// I need to finish this validation
		if (validBook) {
			res.status(412).send({
				success: false,
				message: 'Validation failed',
				data: 'Invalid ID',
			});
		} else {
			next();
		}
	} catch {
		res.status(415).send({
			success: false,
			message: 'Validation failed',
			data: 'Invalid ID',
		});
	}

}

module.exports = {
	saveBookRead,
	checkID,
};
