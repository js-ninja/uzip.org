var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require("babelify");
var source      = require('vinyl-source-stream');
var plugins     = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

gulp.task('webserver', function(){
	gulp.src('./')
    .pipe(plugins.webserver({
      host       : 'localhost',
      livereload : true,
      open       : true
	}))
})

gulp.task('browserify', function(){
	return browserify({
    entries: ['./js/index.js']
  })
  .transform('babelify', { 
    presets: ['es2015', 'react']
  })
  .bundle()
  .on('error', function(err) {
    console.log('Error:', err);
  })
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./'))
})

gulp.task('build', function() {
  runSequence(
    ['browserify'], ['webserver']
  );
});

gulp.task('watch', function(){
  gulp.watch('./js/*.js',['browserify'])
})