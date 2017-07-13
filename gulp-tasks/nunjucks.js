"use strict";

var gulp = require('gulp'),
    nunjucksRender = require('gulp-nunjucks-render');

var config = require('./config.js'),
    printError = require('./printError.js');

gulp.task('nunjucks', function (cb) { 
    return gulp.src(config.dev.html+'pages/**/*.html') 
        .pipe(nunjucksRender({
        	path: [config.dev.html]
		}))
		.on('error', (err) => {
			printError('nunjucks', err.message);
			cb();
		})
        .pipe(gulp.dest(config.prod.html))
    });