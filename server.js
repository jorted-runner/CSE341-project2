const express = require('express');
const app = express();
const router = require('./routes');
const mongodb = require('./database/db');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const port = process.env.PORT || 8080;
const cookie_secret = process.env.SESSION_SECRET
app
	.use(express.json())
	.use(
		session({
			secret: cookie_secret,
			resave: false,
			saveUninitialized: true,
		})
	)
	.use(passport.initialize())
	.use(passport.session())
	.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
		);
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET, POST, PUT, DELETE, OPTIONS'
		);
		next();
	})
	.use('/', router);

passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: process.env.CALLBACK_URL,
		},
		function (accessToken, refreshToken, profile, done) {
			return done(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((user, done) => {
	done(null, user);
});

app.get('/', (req, res) => {
	res.send(
		req.session.user !== undefined
			? `Logged in as ${req.session.user.displayName}`
			: 'Logged Out'
	);
});

app.get(
	'/github/callback',
	passport.authenticate('github', {
		failureRedirect: '/api-docs',
		session: false,
	}),
	(req, res) => {
		req.session.user = req.user;
		res.redirect('/');
	}
);

mongodb.initDB((err) => {
	if (err) {
		console.log(err);
	} else {
		app.listen(port, () => {
			console.log(`Database is listening. App running on port ${port}`);
		});
	}
});
