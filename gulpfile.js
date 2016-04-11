var gulp = require('gulp');

var browserify = require('browserify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');

var path = require('path');


gulp.task('js', function(){
    browserify('./src/js/main.jsx')
      .transform('reactify', {es6: true})
      .bundle()
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('public/js/build/'));
});

gulp.task('less', function () {
  gulp.src('src/less/main.less') //default main.css
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('./public/css'))
});

gulp.task('watch', function() {
    gulp.watch("src/js/**/*.jsx", ["js"])
    gulp.watch("src/less/**/*.less", ["less"])
})

gulp.task('default', ['js', 'watch', 'less']);
