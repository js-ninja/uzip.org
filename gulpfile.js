var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require("babelify");
var source      = require('vinyl-source-stream');
var plugins     = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

gulp.task('webserver', function(){
	gulp.src('./')
    .pipe(plugins.webserver({
      fallback   : 'index.html',
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

gulp.task('build-css', function(){
  return gulp.src('./less/**/*.less')
    .pipe(plugins.less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css'));
})

gulp.task('build', function() {
  runSequence(
    ['browserify'], ['build-css'], ['webserver']
  );
});

gulp.task('watch', function(){
  gulp.watch('./js/*.js',['browserify'])
  gulp.watch('./less/**/*.less',['build-css'])
})