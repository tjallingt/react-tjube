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
var es 			= require( 'event-stream' );
var del 		= require( 'del' );

// exports whole application to dist folder
gulp.task( 'default', ['build'] );

// removes dist folder
gulp.task( 'clean', function() {
	del( ['./static/js'] );
});

// calls browserify to compile jsx files
gulp.task( 'build', function() {
	var entries = ['screen.jsx', 'remote.jsx'];

	var tasks = entries.map( function( entry ) {
		return browserify({ 
				entries: entry,
				extensions: ['.jsx'],
				basedir: './src',
				debug: true
			})
			.transform(babelify.configure({stage: 0}))
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
	});

	return es.merge.apply( null, tasks );
});