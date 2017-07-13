"use strict";

var gulp = require('gulp'),
    critical = require('critical').stream,
    flatten = require('gulp-flatten'),
    config =  require('./config.js');

gulp.task('critical', function () {
    return gulp.src(['build/**/*.html'])
        .pipe(critical({
            base: 'build', 
            css: config.prod.css+'/style.css',
            timeout: 120000,
            width: 1920,
            height: 1000
        }))
        .pipe(flatten())
        .on('error',function(error){
            console.log(error)
        })
        .pipe(gulp.dest(config.prod.css));
});