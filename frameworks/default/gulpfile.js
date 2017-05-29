var gulp = require('gulp');
var jsdoc  = require('gulp-jsdoc3');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var del = require('del');
var sassLint = require('gulp-sass-lint');

gulp.task('browserSync', function() {
  var ssl = gutil.env.s || false;
  if(ssl)
      var p = 443;
    else
      var p = 3005;

  browserSync.init({
    server: {
        baseDir: "./src/",
        index: "index.html"
    },
    port : p,
    https: ssl,
  })
})

gulp.task('reload-js', function(){
  browserSync.reload();
});

gulp.task('watch', function() {
    gulp.watch('./src/scripts/**/*.js', ['jsLint','reload-js']);
    gulp.watch('./src/scss/**/*.s+(a|c)ss', ['sass']);
    gulp.watch('./src/css/**/*.css', browserSync.reload);
    gulp.watch('./src/**/*.html', ['reload-js']);
});

gulp.task('sass', function() {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass({ includePaths : ['./src/scss'], errLogToConsole: true}))
    .pipe(sassLint({
      options: {
        formatter: 'stylish',
        'merge-default-rules': false
      },
      files: {ignore: '**/*.css'},
      rules: {
        'no-ids': 1,
        'no-mergeable-selectors': 0
      },
      configFile: '.scss-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('useref',function(){
	return gulp.src('./src/**/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'));
});

gulp.task('jsLint', function () {
    gulp.src(['./src/scripts/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('doc', function (cb) {
    var config = require('./.jsdoc.json');
    gulp.src(['README.md', './src/scripts/**/*.js'], {read: true})
        .pipe(jsdoc(config, cb));
});

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'jsLint',
    'sass',
    ['useref'],
    callback
  )
})

gulp.task('serve', function(callback) {
  runSequence(['sass','browserSync','watch'],
    callback
  )
})