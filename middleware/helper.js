const Validator = require('validatorjs');
const mongodb = require('../database/db');

const validator = (body, rules, customMessages, callback) => {
	const validation = new Validator(body, rules, customMessages);
	validation.passes(() => callback(null, true));
	validation.fails(() => callback(validation.errors, false));
};

async function getOneByID(ID) {
	const validBookFromRead = await mongodb
		.getDatabase()
		.db()
		.collection('books_read')
		.find({ _id: ID })
		.toArray();

	if (validBookFromRead.length > 0) {
		return validBookFromRead;
	}

	const validBookFromTBR = await mongodb
		.getDatabase()
		.db()
		.collection('books_tbr')
		.find({ _id: ID })
		.toArray();

	return validBookFromTBR;
}

module.exports = {validator, getOneByID};
