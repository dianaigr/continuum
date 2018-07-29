'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var minify = require('gulp-minify');

var paths = {
  src_sass: 'assets/scss/*.scss',
  dest_css : 'dist',
  src_js: 'assets/js/*.js',
  dest_js: 'dist',
  src_html: '*.html',
  dest_html: ''

}
/* ==  Gulp task to minify CSS files == */
gulp.task('sass', function () {
  return gulp.src(paths.src_sass)
    /* Compile SASS files */
    .pipe(sass().on('error', sass.logError))
    /* Add prefixer for browser compatibility */
    .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    /* Minify CSS */
    .pipe(csso())
    .pipe(gulp.dest(paths.dest_css));
});

/* ==  Gulp task to minify HTML files == */
gulp.task('minifyHtml', function() {
  return gulp.src([paths.src_html])
    /* Minify Html files */
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(paths.dest_html));
});

/* == Gulp task to minify JavaScript files  == */
gulp.task('minifyScript', function() {
  gulp.src(paths.src_js)
    /* Minify JavaScript files */
    .pipe(minify({
      ext:{
        min:'.min.js'
      }
    }))
    .pipe(gulp.dest(paths.dest_js))
});


gulp.task('watcher', function () {
  gulp.watch([paths.src_sass, paths.dest_css], ['sass']);
});

gulp.task('default', ['sass', 'watcher']);
gulp.task('deploy', ['minifyScript', 'minifyHtml']);
