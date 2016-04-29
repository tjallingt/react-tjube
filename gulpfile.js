/*
Gulpfile for React applications
Uses browserify to import and export components
Babelify allows for jsx and es6 syntax
*/

var browserify 	= require('browserify');
var babelify 	= require('babelify');

var gulp 		= require('gulp');
var rename 		= require('gulp-rename');
var gulpif 		= require('gulp-if');
var uglify 		= require('gulp-uglify');
var gutil 		= require('gulp-util');
var sourcemaps 	= require('gulp-sourcemaps');

var source 		= require('vinyl-source-stream');
var buffer 		= require('vinyl-buffer');
var del 		= require('del');

// exports whole application to dist folder
gulp.task('default', ['set-production', 'build-debug']);

gulp.task('build-debug', ['build-screen', 'build-remote']);

gulp.task('set-production', function() {
    process.env.NODE_ENV = 'production';
});

// removes dist folder
gulp.task('clean', function() {
	del(['./static/js']);
});

// calls browserify to compile jsx files for the screen
gulp.task('build-screen', function() {
	bundle('screen.jsx');
});

// calls browserify to compile jsx files for the remote
gulp.task('build-remote', function() {
	bundle('remote.jsx');
});

function bundle(entry) {
	return browserify({ 
		entries: entry,
		extensions: ['.jsx'],
		basedir: './src'
	})
	.exclude('ws')
	.transform('babelify')
	.bundle()
	.on('error', gutil.log)
	.pipe(source(entry))
	.pipe(buffer())
		.pipe(gulpif((process.env.NODE_ENV === 'production'), uglify()))
		.on('error', gutil.log)
	.pipe(rename({ extname: '.js' }))
	.pipe(gulp.dest('./static/js'));
}