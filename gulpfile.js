/*
Gulpfile for React applications
Uses browserify to import and export components
Babelify allows for jsx and es6 syntax
*/

var browserify 	= require( 'browserify' );
var babelify 	= require( 'babelify' );

var gulp 		= require( 'gulp' );
var rename 		= require( 'gulp-rename' );
var uglify 		= require( 'gulp-uglify' );
var gutil 		= require( 'gulp-util' );
var sourcemaps 	= require( 'gulp-sourcemaps' );

var source 		= require( 'vinyl-source-stream' );
var buffer 		= require( 'vinyl-buffer' );
var del 		= require( 'del' );

// exports whole application to dist folder
gulp.task( 'default', ['build-screen', 'build-remote'] );

// removes dist folder
gulp.task( 'clean', function() {
	del( ['./static/js'] );
});

// calls browserify to compile jsx files for the screen
gulp.task( 'build-screen', function() {
	bundle('screen.jsx');	
});

// calls browserify to compile jsx files for the remote
gulp.task( 'build-remote', function() {
	bundle('remote.jsx');	
});

function bundle( entry ) {
	return browserify({ 
		entries: entry,
		extensions: ['.jsx'],
		basedir: './src',
		debug: true
	})
	.transform( babelify.configure({presets: ["es2015", "react", "stage-0"]}) )
	.bundle()
	.on( 'error', gutil.log )
	.pipe( source( entry ) )
	.pipe( buffer() )
	//.pipe( sourcemaps.init({ loadMaps: true, debug: true }) ) // loads map from babelify
		//.pipe( uglify() )
		//.on( 'error', gutil.log )
	//.pipe( sourcemaps.write() ) // writes .map file
	.pipe( rename({ extname: '.js' }) )
	.pipe( gulp.dest( './static/js' ) );
}