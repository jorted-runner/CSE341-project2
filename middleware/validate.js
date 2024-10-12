const validatorHelper = require('./helper');
const ObjectId = require('mongodb').ObjectId;

const saveBookRead = (req, res, next) => {
	const validationRule = {
		title: 'required|string',
		author: 'required|string',
		rating: 'required|numeric|max:5',
		review: 'required|string',
		date_finished: 'required|string',
	};
	validatorHelper.validator(req.body, validationRule, {}, (err, status) => {
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

const saveBookTbr = (req, res, next) => {
	const validationRule = {
		title: 'required|string',
		author: 'required|string',
		date_added: 'required|string',
	};
	validatorHelper.validator(req.body, validationRule, {}, (err, status) => {
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

async function checkID(req, res, next) {
	try {
        const bookID = new ObjectId(req.params.id);
        const validBook = await validatorHelper.getOneByID(bookID)
		if (validBook.length < 1) {
			res.status(412).send({
				success: false,
				message: 'Validation failed',
				data: 'Invalid ID - Book not found',
			});
		} else {
			next();
		}
	} catch {
		res.status(400).send({
			success: false,
			message: 'Validation failed',
			data: 'Invalid ID format',
		});
	}
}

module.exports = {
	saveBookRead,
	checkID,
	saveBookTbr
};
