/* eslint no-console: 0, strict: 0 */
'use strict';
/*
	Node server for Tjube.Ninja.
	The server generates a unique room id when a user connects.
	This id allows the remotes to send data to the screen(s).
*/

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const filterYoutubeData = require('./src/utils/FilterYoutubeData');

const port = 1337;
const roomIdLength = 3;
const roomIdRegex = `[a-z0-9]{${roomIdLength}}`;

server.listen(port);
console.log(`server started on port ${port}`);

// Tries 10 times to generate a unique room id of a specified length
function generateUniqueRoomId(length) {
	let id = '';
	for (let i = 0; i < 10; i++) {
		const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
		for (let j = 0; j < length; j++) {
			id += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		if (!io.sockets.adapter.rooms.hasOwnProperty(id)) {
			return id;
		}
	}
	return false;
}

// Serve static files
app.use(express.static('./static'));

// Parse application/json post body
app.use(bodyParser.json());

// Use mustache to render html
app.engine('mustache', mustache());

// Show room select/create screen
app.get('/', (req, res) => {
	const roomId = generateUniqueRoomId(roomIdLength);
	if (roomId) res.redirect(`/player/${roomId}`);
	else res.status(503).send('Server is crowded, please try again later :)');
});

// Show about page
app.get('/about', (req, res) => {
	res.sendFile(`${__dirname}/views/about.html`);
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
	if (video) {
		io.to(req.params.room).emit('addVideo', video);
		res.json({ status: 'ok' });
	} else {
		res.status(422).json({ status: 'error' });
	}
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
