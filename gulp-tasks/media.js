"use strict";

var config = require('./config.js');
var gulp = require('gulp');


['media','fonts','img'].forEach(function(taskName, i) {
    gulp.task(taskName, function() {
        return gulp.src(config.dev[taskName] + '/**/*')
        .pipe(gulp.dest(config.prod[taskName]))
    });    
});