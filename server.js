/* eslint no-console: 0, strict: 0, global-require: 0, import/no-extraneous-dependencies: 0 */

'use strict';

/*
	Node server for Tjube.Ninja.
	The server generates a unique room id when a user connects.
	This id allows the remotes to send data to the screen(s).
*/

const http = require('http');
const express = require('express');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const filterYoutubeData = require('./src/utils/FilterYoutubeData');

const roomIdLength = 3;
const roomIdChars = 'abcdefghijklmnopqrstuvwxyz';
const roomIdRegex = `[${roomIdChars}]{${roomIdLength}}`;

server.listen(process.env.PORT || 1337, () => console.log('opened server on', server.address()));

function generateRoomId() {
	let id = '';
	for (let j = 0; j < roomIdLength; j += 1) {
		id += roomIdChars.charAt(Math.floor(Math.random() * roomIdChars.length));
	}
	return id;
}

function roomExists(id) {
	return Object.hasOwnProperty.call(io.sockets.adapter.rooms, id);
}

// Tries 10 times to generate a unique room id
function generateUniqueRoomId() {
	for (let i = 0; i < 10; i += 1) {
		const id = generateRoomId();
		if (!roomExists(id)) {
			return id;
		}
	}
	return false;
}

if (process.env.NODE_ENV !== 'production') {
	console.log('running in dev mode!');

	const webpack = require('webpack');
	const devMiddleware = require('webpack-dev-middleware');
	const hotMiddleware = require('webpack-hot-middleware');
	const webpackConfig = require('./webpack.config.dev');

	const compiler = webpack(webpackConfig);

	app.use(devMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
	}));

	app.use(hotMiddleware(compiler));
} else {
	// Serve build files
	app.use(express.static('./build'));
}

// Serve static files
app.use(express.static('./static'));

// Logging express routes
app.use(morgan('short'));

// Parse application/json post body
app.use(bodyParser.json());

// Use mustache to render html
app.engine('mustache', mustache());

// Show room select/create screen
app.get('/', (req, res) => {
	const roomId = generateUniqueRoomId();
	if (roomId) {
		res.redirect(`/player/${roomId}`);
	} else {
		res.status(503).send('Server is crowded, please try again later :)');
	}
});

// Redirect to remote
app.get(`/:room(${roomIdRegex})`, (req, res) => {
	res.redirect(`/remote/${req.params.room}`);
});

// Show public screen
app.get(`/player/:room(${roomIdRegex})`, (req, res) => {
	res.render('template.mustache', { view: 'player', room: req.params.room });
});

// Show remote screen
app.get(`/remote/:room(${roomIdRegex})`, (req, res) => {
	res.render('template.mustache', { view: 'remote', room: req.params.room });
});

// add video with post request
app.post(`/add/:room(${roomIdRegex})`, (req, res) => {
	const video = filterYoutubeData(req.body);
	if (video && roomExists(req.params.room)) {
		io.to(req.params.room).emit('addVideo', video);
		res.json({ status: 'ok' });
		return;
	}
	res.status(422).json({ status: 'error' });
});

// Communicate with clients
io.on('connect', (socket) => {
	let currentRoom = '';
	socket.on('registerRoom', (room) => {
		currentRoom = room;
		socket.join(currentRoom);
	});

	socket.on('addVideo', (video, success) => {
		socket.broadcast.to(currentRoom).emit('addVideo', video);
		success();
	});
});
