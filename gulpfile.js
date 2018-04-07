var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var autoprefixer = require('gulp-autoprefixer');
const jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var pump = require('pump');
var browserSync = require('browser-sync').create();

///////// Compile LESS
gulp.task('less', function () {
  return gulp.src('./less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer({
        browsers: [
            'last 2 versions',
        ],
        cascade: false
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// create a task that ensures the `less` task is complete before
// reloading browsers
gulp.task('less-watch', ['less'], function (done) {
    browserSync.reload();
    done();
});


//// JavaScript
//jslint
gulp.task('jslint', function() {
    return gulp.src('./js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});

//uglify
gulp.task('uglify', function (cb) {
    pump([
          gulp.src('./js/**/*.js'),
          uglify(),
          gulp.dest('./js'),
          browserSync.stream()
      ],
      cb
    );
  });

// create a task that ensures the `jslint` and `uglify` tasks are complete before
// reloading browsers
gulp.task('js-watch', ['jslint', 'uglify'], function (done) {
    browserSync.reload();
    done();
});



// Live Server with Browser Sync
// Static Server + watching less/js/html files
gulp.task('serve', ['less-watch'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("less/*.less", ['less-watch']);
    gulp.watch("js/**/*.js", ["js-watch"]);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['serve']);