/*
	Node server for Tjube.Ninja.
	The server generates a unique room id when a user connects and allows the remotes to send data to the screen(s).
*/

var port = 1337;
var express = require( 'express' );
var bodyParser = require('body-parser');
var mustache = require( 'mustache-express' );
var app = express();
var server = require( 'http' ).createServer( app );
var io = require( 'socket.io' )( server );
var roomIdLength = 3;
var roomIdRegex = `[a-z0-9]{${roomIdLength}}`;

var FilterYoutubeData = require('./src/FilterYoutubeData.js')

server.listen( port );
console.log( `server started on port ${port}` );

// Serve static files
app.use( express.static( './static' ) );

// Parse application/json post body
app.use(bodyParser.json());

// Use mustache to render html 
app.engine( 'mustache', mustache() );

// Show room select/create screen
app.get( '/', ( req, res ) => {
	var roomId = generateUniqueRoomId();
	if( roomId ) res.redirect( '/room/' + roomId );
	else res.status( 503 ).send( 'Server is crowded, please try again later :)' );
});

// Show about page
app.get( '/about', ( req, res ) => {
	//res.sendFile( __dirname + '/about.html' );
	res.send( "about" );
});

// Show public screen
app.get( `/room/:room(${roomIdRegex})`, ( req, res ) => {
	res.render( 'template.mustache', {view: 'screen', room: req.params.room} );
});

// Show remote screen
app.get( `/add/:room(${roomIdRegex})`, ( req, res ) => {
	res.render( 'template.mustache', {view: 'remote', room: req.params.room} );
});

// add video with post request
app.post( `/add/:room(${roomIdRegex})`, ( req, res ) => {
	var video = FilterYoutubeData(req.body);
	if( video !== false ) {
		io.to( req.params.room ).emit( 'cueVideo', video );
		res.json({status:"ok"});
	}
	else {
		res.json({status:"error"});
	}
});

// Communicate with clients
io.on( 'connection', ( socket ) => {
	socket.on( 'registerRoom', ( room ) => {
		socket.room = room;
		socket.join( socket.room );
	});
	
	socket.on( 'cueVideo', ( video ) => {
		socket.broadcast.to( socket.room ).emit( 'cueVideo',  video );
	});
});

// Tries 10 times to generate a unique (not currently in use) room id of a length specified by roomIdLength
function generateUniqueRoomId() {
	var id = '';
	for(var i = 0; i < 10; i++) {
		var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
		for( var i=0; i < roomIdLength; i++ ) id += possible.charAt(Math.floor(Math.random() * possible.length));
		if( !io.sockets.adapter.rooms.hasOwnProperty( id ) ) return id;
	} 
	return false;
}