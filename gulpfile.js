const gulp = require('gulp');
const babel = require('gulp-babel');
const less = require('gulp-less')
const path = require('path');

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

    gulp.src('public/javascripts/some_jquery_ui.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('public/dist_javascript'));

    gulp.src('public/stylesheets/style.less')
        .pipe(less( {
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./public/stylesheets'));
    done()
});