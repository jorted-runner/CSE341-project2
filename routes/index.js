const router = require('express').Router();
const passport = require('passport');
const readRouter = require('./booksRead');
const tbrRouter = require('./booksTBR');
const swaggerRouter = require('./swagger');

router.use('/', swaggerRouter);

router.get('/', (req, res) => {
	//#swagger.tags=['Hello World]
	res.send('Hello World');
});

router.get('/login', passport.authenticate('github'), (req, res) => {
	//#swagger.tags=['Authentication']
});

router.get('/logout', function (req, res, next) {
	//#swagger.tags=['Authentication']
	req.logOut(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});

router.use('/read', readRouter);
router.use('/tbr', tbrRouter);

module.exports = router;
