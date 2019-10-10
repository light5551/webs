const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task("hello", (callback) => {
    console.log('hello');
    callback();
});

gulp.task('default', (done) => {
    gulp.src('public/javascripts/save.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('public/dist_javascript'));

    gulp.src('public/javascripts/add_modal.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('public/dist_javascript'));
    done()
});