const validatorHelper = require('./helper');

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

module.exports = {
	saveBookRead,
};
