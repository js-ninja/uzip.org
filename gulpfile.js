var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require("babelify");
var source      = require('vinyl-source-stream');
var plugins     = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var watchLess   = require('gulp-watch-less');
var domain      = require("domain");

gulp.task('webserver', function(){
	gulp.src('./')
    .pipe(plugins.webserver({
      fallback   : 'index.html',
      host       : 'localhost',
      livereload : {
        enable : true
      },
      open       : true
	}))
})

gulp.task('browserify', function(){
  console.log('Browserifying ...');
	return browserify({
    entries : ['./js/index.js'],
    debug   : true
  })
  .transform('babelify', {presets: ['es2015', 'react']})
  .bundle()
  .on('error', function(err) {
    console.log('Error:', err);
  })
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./'))

  /* ------------Issueeeeeee -----gulp start again on error*/
  /*.on('error', plugins.util.log);*/
  /*.pipe(plugins.tap(function(file) {
    var d = domain.create();
    d.on('error', function(err) {
      plugins.util.log(plugins.util.colors.red('Browserify compile error:'), err.message, '\n\t', $.util.colors.cyan('in file'), file.path);
      plugins.util.beep();
    });

    d.run(bundle)
  }))*/
})

gulp.task('build-css', function(){
  return gulp.src('./less/**/*.less')
    .pipe(plugins.less())
    .pipe(gulp.dest('./css'))
})

gulp.task('build', function() {
  runSequence(
    ['build-css'], ['browserify'], ['webserver'], ['watch']
  );
});

gulp.task('watch', function(){
  gulp.watch('./js/*.js',['browserify'])
  gulp.watch('./less/**/*.less',['build-css'])
  gulp.watch('./css/**/*.css')
})