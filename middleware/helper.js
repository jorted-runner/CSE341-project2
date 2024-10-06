const Validator = require('validatorjs');
const mongodb = require('../database/db');

const validator = (body, rules, customMessages, callback) => {
	const validation = new Validator(body, rules, customMessages);
	validation.passes(() => callback(null, true));
	validation.fails(() => callback(validation.errors, false));
};

async function getOneByID(ID) {
	const validBook = await mongodb
		.getDatabase()
		.db()
		.collection('books_read')
		.find({ _id: ID })
		.toArray();
    return await validBook
}

module.exports = {validator, getOneByID};
