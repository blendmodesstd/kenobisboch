"use strict";

var gulp = require('gulp'),
    watch = require('gulp-watch'),
	config =  require('./gulp-tasks/config.js'),
    printSuccess = require('./gulp-tasks/printSuccess.js'),
    runSequence = require('run-sequence'),
    clean = require('gulp-clean'),
    ghPages     = require('gulp-gh-pages'),
    browserSync = require('browser-sync');

var reload = browserSync.reload;

require('require-dir')('./gulp-tasks');

gulp.task('apply-prod-environment', function() {
    process.stdout.write("Setting NODE_ENV to 'production'" + "\n");
    process.env.NODE_ENV = 'production';
    if (process.env.NODE_ENV != 'production') {
        throw new Error("Failed to set NODE_ENV to PRODUCTION!");
    } else {
        printSuccess("Successfully set NODE_ENV to production",'');
    }
});

gulp.task('watch', ['sass','twig','server','browserify', 'media', 'fonts', 'img'], function() {
	watch(config.dev.sass+'**/*.scss', { usePolling: true }, function() {
    	gulp.start(['sass']);
	});
    watch(config.dev.html+'**/*.twig', { usePolling: true }, function() {
        gulp.start(['twig']);
    });
    watch(config.prod.html+'**/*.html', { usePolling: true }, reload);
	watch(config.dev.media+'**/*', { usePolling: true }, function() {
    	gulp.start(['media']);
	});
});

gulp.task('clean', function () {
    return gulp.src('build', {read: false})
        .pipe(clean());
});

gulp.task('default',['watch']);

gulp.task('build', function(){
    runSequence(
        'clean',
        'apply-prod-environment',
        'browserify',
        'sass',
        'media',
        'fonts',
        'img',
        'uglify:js',
        // 'critical',
        'uglify:css',
        'twig',
        'uglify:html'
    );
});

gulp.task('deploy', function () {
  return gulp.src("./build/**/*")
    .pipe(ghPages({
        branch: 'master'
    }))
});

