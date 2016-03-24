// include gulp
var gulp = require('gulp')
// include plugins
var source = require('vinyl-source-stream')
var browserify = require('browserify')
var babel = require('babelify')

var paths = {
  jsxs: ['static/js/**/*.jsx']
}

gulp.task('browserify', function() {
  browserify('static/js/main.js')
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .pipe(source('script.js'))
    .pipe(gulp.dest('./static/js/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.jsxs, ['browserify']);
});

gulp.task('default', ['browserify']);
